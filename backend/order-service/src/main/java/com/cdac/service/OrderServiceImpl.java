package com.cdac.service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cdac.client.PaymentServiceClient;
import com.cdac.client.ProductServiceClient;
import com.cdac.client.UserServiceClient;
import com.cdac.config.OrderProperties;
import com.cdac.custom_exception.AccessDeniedException;
import com.cdac.custom_exception.ResourceNotFoundException;
import com.cdac.dto.BatchReserveRequest;
import com.cdac.dto.CreateOrderRequestDto;
import com.cdac.dto.CustomerDetailsDto;
import com.cdac.dto.DailyRevenueDto;
import com.cdac.dto.OrderItemResponseDto;
import com.cdac.dto.OrderResponseDto;
import com.cdac.dto.PaymentRequestDto;
import com.cdac.dto.VendorOrderDetailsDto;
import com.cdac.dto.WeeklyAnalyticsDto;
import com.cdac.entity.Order;
import com.cdac.entity.OrderItem;
import com.cdac.entity.OrderStatus;
import com.cdac.entity.VendorOrder;
import com.cdac.entity.VendorOrderStatus;
import com.cdac.repository.OrderRepository;
import com.cdac.repository.VendorOrderRepository;
import com.cdac.util.OrderMapper;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

	private final OrderProperties orderProperties;
	private final OrderRepository orderRepository;
	private final VendorOrderRepository vendorOrderRepository;
	private final ProductServiceClient productServiceClient;
	private final UserServiceClient userServiceClient;
	private final PaymentServiceClient paymentServiceClient;
	//private final CentralLoggerService loggerService;
	private final NotificationService notificationService;
	
	@Override
	@Transactional
	public OrderResponseDto createOrder(Long customerId, CreateOrderRequestDto dto) {
		/*
		 * Generate Order UUID
		 */
	    UUID orderId = UUID.randomUUID();
	    
		/*
	     * Get customer details (eg name, address, ...)
	     */
	    CustomerDetailsDto customerDetails = userServiceClient.getCustomerDetails(customerId);
	    
	    /*
		 * Reserve products & Fetch product details
	     */ 
	     BatchReserveRequest request = new BatchReserveRequest();
	     request.setOrderId(orderId);
	     request.setItems(dto.getItems());
	     
	     List<OrderItemResponseDto> items = productServiceClient.reserveStock(request);
	    
	    /*
	     * Calculate Pricing
	     */
	    BigDecimal subtotal = BigDecimal.ZERO;

	    for (OrderItemResponseDto item : items) {

	        BigDecimal itemTotal = item.getPrice()
	                .multiply(BigDecimal.valueOf(item.getQuantity()));

	        subtotal = subtotal.add(itemTotal);
	    }

	    BigDecimal handlingFee = orderProperties.getHandlingFee();

	    BigDecimal deliveryCharge =
	            subtotal.compareTo(orderProperties.getFreeDeliveryAbove()) >= 0
	                    ? BigDecimal.ZERO
	                    : orderProperties.getDeliveryCharges();

	    BigDecimal grandTotal = subtotal
	            .add(handlingFee)
	            .add(deliveryCharge);
	    
	    /*
	     * Create Payment
	     */
	    PaymentRequestDto paymentRequest = PaymentRequestDto.builder()
	    		.orderId(orderId)
	    		.amount(grandTotal)
	    		.customerId(customerId)
	    		.customerName(customerDetails.getName())
	    		.customerEmail(customerDetails.getEmail())
	    		.customerPhoneNo(customerDetails.getPhoneNo())
	    		.build();

	        String paymentSessionId =
	                paymentServiceClient.createPayment(paymentRequest);
	    

	    /*
	     * Create Order
	     */
	    Order order = Order.builder()
	            .id(orderId)
	            .customerId(customerId)
	            .totalAmount(grandTotal)
	            .status(OrderStatus.PAYMENT_PENDING)
	            .paymentSessionId(paymentSessionId)
	            .name(customerDetails.getName())
	            .phoneNo(customerDetails.getPhoneNo())
	            .email(customerDetails.getEmail())
	            .address(customerDetails.getAddress())
	            .city(customerDetails.getAddress())
	            .state(customerDetails.getState())
	            .pincode(customerDetails.getPincode())
	            .vendorOrders(new ArrayList<>())
	            .build();
	    
	    /* 
	     * Group ordered items by Vendor Id
	     */
	    Map<Long, List<OrderItemResponseDto>> groupedItems =
	            items.stream()
	                 .collect(Collectors.groupingBy(OrderItemResponseDto::getVendorId));
	    
	    /*
	     * Create VendorOrder for each vendor
	     */
	    for (Map.Entry<Long, List<OrderItemResponseDto>> entry : groupedItems.entrySet()) {

	        Long vendorId = entry.getKey();
	        List<OrderItemResponseDto> vendorItems = entry.getValue();

	        BigDecimal vendorSubtotal = BigDecimal.ZERO;

	        VendorOrder vendorOrder = VendorOrder.builder()
	                .vendorId(vendorId)
	                .status(VendorOrderStatus.PENDING)
	                .commissionAmount(BigDecimal.ZERO)
	                .order(order)
	                .items(new ArrayList<>())
	                .build();
	            
		    for (OrderItemResponseDto dtoItem : vendorItems) {
	
		        BigDecimal total =
		                dtoItem.getPrice()
		                       .multiply(BigDecimal.valueOf(dtoItem.getQuantity()));
	
		        vendorSubtotal = vendorSubtotal.add(total);
	
		        // Create Order Items
		        OrderItem orderItem = new OrderItem();
	
		        orderItem.setProductId(dtoItem.getProductId());
		        orderItem.setProductName(dtoItem.getName());
		        orderItem.setProductImage(dtoItem.getImage());
		        orderItem.setPrice(dtoItem.getPrice());
		        orderItem.setQuantity(dtoItem.getQuantity());
	
		        orderItem.setVendorOrder(vendorOrder);
	
		        vendorOrder.getItems().add(orderItem);
		    }
		    
		    vendorOrder.setSubtotal(vendorSubtotal);

		    // 5% Platform Charges (commission)
		    vendorOrder.setCommissionAmount(
		            vendorSubtotal.multiply(orderProperties.getCommission())
		    );

		    order.getVendorOrders().add(vendorOrder);
	    	}
		
	    /*
	     * Save order
	     */
	    orderRepository.save(order);
		
	    /*
	     * Generate Log: Order placed successfully
	     */
//	   loggerService.info(
//	            "ROLE_CUSTOMER",
//	            customerId,
//	            "Order placed successfully"
//	    );
	    
	    /*
	     *  Return Response
	     */
	    return OrderResponseDto.builder()
	            .orderId(order.getId())
	            .subtotal(subtotal)
	            .handlingFee(handlingFee)
	            .deliveryCharge(deliveryCharge)
	            .grandTotal(grandTotal)
	            .status(order.getStatus())
	            .paymentSessionId(paymentSessionId)
	            .address(order.getAddress())
	            .city(order.getCity())
	            .state(order.getState())
	            .pincode(order.getPincode())
	            .items(items)
	            .build();
	}

	@Override
	public List<OrderResponseDto> getAllOrdersForCustomer(Long customerId) {
		List<Order> orders = orderRepository.findByCustomerId(customerId);
		List<OrderResponseDto> orderResponse = new ArrayList<>();
		for(Order order : orders) {
			 OrderResponseDto dto = OrderMapper.mapToDto(order);
			 orderResponse.add(dto); 
		}
		return orderResponse;
	}
	
	@Override	
	public OrderResponseDto getOrderById(UUID orderId) {

		Order order = orderRepository.findById(orderId)
				.orElseThrow(() -> new ResourceNotFoundException("Order not found"));
		
		return OrderMapper.mapToDto(order);
	}

	@Override
	public List<VendorOrder> getAllOrdersForVendor(Long vendorId) {
		return vendorOrderRepository.findByVendorId(vendorId);
	}
	
	@Override
	public VendorOrderDetailsDto getVendorOrderDetailsById(Long vendorOrderId) {

	    VendorOrder vendorOrder = vendorOrderRepository.findById(vendorOrderId)
	            .orElseThrow(() -> new ResourceNotFoundException("Order not found"));

	    Order order = vendorOrder.getOrder();

	    CustomerDetailsDto customer = CustomerDetailsDto.builder()
	            .name(order.getName())
	            .phoneNo(order.getPhoneNo())
	            .address(order.getAddress())
	            .city(order.getCity())
	            .state(order.getState())
	            .pincode(order.getPincode())
	            .build();

	    List<OrderItemResponseDto> items = vendorOrder.getItems()
	            .stream()
	            .map(item -> OrderItemResponseDto.builder()
	                    .productId(item.getProductId())
	                    .vendorId(vendorOrder.getVendorId())
	                    .name(item.getProductName())
	                    .image(item.getProductImage())
	                    .price(item.getPrice())
	                    .quantity(item.getQuantity())
	                    .build())
	            .toList();

	    return VendorOrderDetailsDto.builder()
	            .id(vendorOrder.getId())
	            .subtotal(vendorOrder.getSubtotal())
	            .commissionAmount(vendorOrder.getCommissionAmount())
	            .status(vendorOrder.getStatus())
	            .customer(customer)
	            .items(items)
	            .build();
	}

	@Override
	@Transactional
	public void updateVendorOrderStatus(Long vendorId, Long vendorOrderId, VendorOrderStatus newStatus) {
		VendorOrder vendorOrder = vendorOrderRepository.findById(vendorOrderId)
			.orElseThrow(() -> new ResourceNotFoundException("Order not found"));
		
		// vendor cannot change status of other vendor's order status
		if(vendorOrder.getVendorId() != vendorId) {
			throw new AccessDeniedException("Access denied");
		}
		
		vendorOrder.setStatus(newStatus);
	}

	@Override
	@Transactional
	public void updateOrderStatus(UUID orderId, OrderStatus newStatus) {
		Order order = orderRepository.findById(orderId)
				.orElseThrow(() -> new ResourceNotFoundException("Order not found"));
		
		order.setStatus(newStatus);
		
		// Calling Product Service to confirm/release reserved stocks
		if(newStatus == OrderStatus.CONFIRMED) {
			productServiceClient.confirmStock(orderId);
			
			// send order confirmed notification
			notificationService.sendNotification(order.getEmail(), "Order placed successfully", "Order placed successfully with order id: " + orderId.toString());
		}
		else {
			productServiceClient.releaseStock(orderId);
		}
	}

	@Override
	public WeeklyAnalyticsDto getVendorDashboardAnalytics(Long vendorId) {
		Long totalOrders =
	            vendorOrderRepository.getVendorWeeklyOrders(vendorId);

	    BigDecimal totalIncome =
	            vendorOrderRepository.getVendorWeeklyIncome(vendorId);

	    List<DailyRevenueDto> weeklySales = vendorOrderRepository.getVendorWeeklySales(vendorId)
	            .stream()
	            .map((Object[] row) -> DailyRevenueDto.builder()
	                    .day((String) row[0])
	                    .income((BigDecimal) row[1])
	                    .build())
	            .toList();

	    return WeeklyAnalyticsDto.builder()
	    			.weeklyRevenue(totalIncome)
	            .weeklyOrders(totalOrders)
	            .weeklySales(weeklySales)
	            .build();
	}

	@Override
	public WeeklyAnalyticsDto getAdminDashboardAnalytics() {

	    BigDecimal totalIncome = vendorOrderRepository.getAdminWeeklyIncome();
	    Long totalOrders = orderRepository.getAdminWeeklyOrders();

	    List<DailyRevenueDto> weeklySales = vendorOrderRepository.getAdminWeeklyRevenue()
	            .stream()
	            .map((Object[] row) -> DailyRevenueDto.builder()
	                    .day((String) row[0])
	                    .income((BigDecimal) row[1])
	                    .build())
	            .toList();

	    return WeeklyAnalyticsDto.builder()
	            .weeklyRevenue(totalIncome)
	            .weeklyOrders(totalOrders)
	            .weeklySales(weeklySales)
	            .build();
	}	
	
	
}
