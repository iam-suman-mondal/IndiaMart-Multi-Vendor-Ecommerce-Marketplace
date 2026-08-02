package com.multivendor.apigateway.filter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.http.HttpMethod;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;

import com.multivendor.apigateway.exception.AccessDeniedException;
import com.multivendor.apigateway.exception.MissingTokenException;
import com.multivendor.apigateway.util.JwtUtil;
import org.springframework.util.AntPathMatcher;
import reactor.core.publisher.Mono;

@Component
public class JwtAuthenticationFilter implements GlobalFilter, Ordered {

    @Autowired
    private JwtUtil jwtUtil;
    private final AntPathMatcher pathMatcher = new AntPathMatcher();
    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {

        ServerHttpRequest request = exchange.getRequest();

        String path = request.getURI().getPath();
        HttpMethod method = request.getMethod();

        System.out.println(method + " " + path);

        //payment-service public endpoint
        if (pathMatcher.match("/api/payments/webhook", path)
    	        && method == HttpMethod.POST) {

    	    return chain.filter(exchange);
    	}
        // PUBLIC APIS
     
        if (path.startsWith("/auth/")
                
                || path.startsWith("/ecommerce/")
                || path.startsWith("/internal/")) {

            return chain.filter(exchange);
        }
        
        //product-service public endpoint
     // Public Product APIs
        if (method == HttpMethod.GET &&
                (path.equals("/api/products")
                || path.equals("/api/products/search")
                || path.equals("/api/products/best-selling")
                || path.matches("/api/products/\\d+"))) {

            return chain.filter(exchange);
        }
     
        // JWT VALIDATION
      
        String authHeader = request.getHeaders().getFirst("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new MissingTokenException("Authorization Header Missing");
        }

        String token = authHeader.substring(7);

        jwtUtil.validateToken(token);

        Long userId = jwtUtil.extractUserId(token);
        String email = jwtUtil.extractEmail(token);
        String role = jwtUtil.extractRole(token);

      
        // USER SERVICE AUTHORIZATION
       

        // ADMIN
        if (path.startsWith("/admin/")
                && !"ROLE_ADMIN".equals(role)) {

            throw new AccessDeniedException(
                    "Only ADMIN can access this resource");
        }

        // VENDOR
        if (path.startsWith("/vendor/")
                && !("ROLE_VENDOR".equals(role)
                || "ROLE_ADMIN".equals(role))) {

            throw new AccessDeniedException(
                    "Only ADMIN or VENDOR can access this resource");
        }

        // CUSTOMER
        if (path.startsWith("/customers/")
                && !("ROLE_CUSTOMER".equals(role)
                || "ROLE_ADMIN".equals(role))) {

            throw new AccessDeniedException(
                    "Only ADMIN or CUSTOMER can access this resource");
        }
         
        //delete vendor
        if (path.equals("/vendor/profile")
                && method == HttpMethod.DELETE
                && !"ROLE_VENDOR".equals(role)) {

            throw new AccessDeniedException(
                    "Only Vendor can delete own profile");
        }
        // PRODUCT SERVICE AUTHORIZATION STARTS HERE
  

        // Add Product
        if (path.equals("/api/products")
                && method == HttpMethod.POST
                && !"ROLE_VENDOR".equals(role)) {

            throw new AccessDeniedException(
                    "Only Vendor can add product");
        }

        // My Products
        if (path.equals("/api/products/myproducts")
                && method == HttpMethod.GET
                && !"ROLE_VENDOR".equals(role)) {

            throw new AccessDeniedException(
                    "Only Vendor can view own products");
        }

        // Edit Product
        if (path.equals("/api/products/Edit")
                && method == HttpMethod.PUT
                && !"ROLE_VENDOR".equals(role)) {

            throw new AccessDeniedException(
                    "Only Vendor can update products");
        }

        // Product Count
        if (path.equals("/ap/products/product-count")
                && method == HttpMethod.GET
                && !"ROLE_VENDOR".equals(role)) {

            throw new AccessDeniedException(
                    "Only Vendor can access product count");
        }

        // Presigned URL
        if (path.equals("/api/products/presigned-url")
                && method == HttpMethod.GET
                && !"ROLE_VENDOR".equals(role)) {

            throw new AccessDeniedException(
                    "Only Vendor can upload images");
        }
        
        // Delete Product
//        if (path.matches("/ap/products/\\d+")
//                && method == HttpMethod.DELETE
//                && !("ROLE_VENDOR".equals(role)
//                || "ROLE_ADMIN".equals(role))) {
//
//            throw new AccessDeniedException(
//                    "Only Vendor or Admin can delete products");
//        }
     // Delete Product
        if (pathMatcher.match("/api/products/{productId}", path)
                && method == HttpMethod.DELETE
                && !("ROLE_VENDOR".equals(role)
                || "ROLE_ADMIN".equals(role))) {

            throw new AccessDeniedException(
                    "Only Vendor or Admin can delete products");
        }

        // Toggle Publish / Unpublish
        if (path.matches("/ap/products/\\d+/publish-unpublish")
                && method == HttpMethod.PATCH
                && !"ROLE_VENDOR".equals(role)) {

            throw new AccessDeniedException(
                    "Only Vendor can publish/unpublish products");
        }

        // Product Rating
//        if (path.matches("/ap/products/\\d+/rating")
//                && method == HttpMethod.POST
//                && !"ROLE_CUSTOMER".equals(role)) {
//
//            throw new AccessDeniedException(
//                    "Only Customer can rate products");
//        }
        
        if (pathMatcher.match("/products/{productId}/rating", path)
                && method == HttpMethod.POST
                && !"ROLE_CUSTOMER".equals(role)) {

            throw new AccessDeniedException(
                    "Only Customer can rate products");
        }

        
        // PUBLIC PRODUCT APIS
        

        // GET /api/products/{id}
        // GET /api/products
        // GET /api/products/search
        // GET /api/products/best-selling
        // These are public APIs, so no role check is required.

        
        
        
     // ======================================
     // ORDER SERVICE AUTHORIZATION
     // ======================================

     // Create Order
     if (path.equals("/orders")
             && method == HttpMethod.POST
             && !"ROLE_CUSTOMER".equals(role)) {

         throw new AccessDeniedException(
                 "Only CUSTOMER can create orders");
     }

     // Get Customer Orders
     if (path.equals("/orders/customer")
             && method == HttpMethod.GET
             && !"ROLE_CUSTOMER".equals(role)) {

         throw new AccessDeniedException(
                 "Only CUSTOMER can view own orders");
     }

     // Get Order Details
     if (pathMatcher.match("/orders/{orderId}", path)
             && method == HttpMethod.GET
             && !("ROLE_CUSTOMER".equals(role)
             || "ROLE_ADMIN".equals(role))) {

         throw new AccessDeniedException(
                 "Only CUSTOMER or ADMIN can view order details");
     }

     // Get Vendor Orders
     if (path.equals("/orders/vendor")
             && method == HttpMethod.GET
             && !"ROLE_VENDOR".equals(role)) {

         throw new AccessDeniedException(
                 "Only VENDOR can view vendor orders");
     }

     // Get Vendor Order Details
     if (pathMatcher.match("/orders/vendor/{vendorOrderId}", path)
             && method == HttpMethod.GET
             && !("ROLE_VENDOR".equals(role)
             || "ROLE_ADMIN".equals(role))) {

         throw new AccessDeniedException(
                 "Only VENDOR or ADMIN can view vendor order details");
     }

     // Update Vendor Order Status
     if (pathMatcher.match("/orders/vendor/update-status/{vendorOrderId}", path)
             && method == HttpMethod.PATCH
             && !"ROLE_VENDOR".equals(role)) {

         throw new AccessDeniedException(
                 "Only VENDOR can update order status");
     }

     // Vendor Analytics
     if (path.equals("/orders/vendor/analytics")
             && method == HttpMethod.GET
             && !"ROLE_VENDOR".equals(role)) {

         throw new AccessDeniedException(
                 "Only VENDOR can access vendor analytics");
     }

     // Admin Analytics
     if (path.equals("/orders/admin/analytics")
             && method == HttpMethod.GET
             && !"ROLE_ADMIN".equals(role)) {

         throw new AccessDeniedException(
                 "Only ADMIN can access admin analytics");
     }
        
     
     
//     
//   //Payment Service - Cashfree Webhook (Public)
//     if (path.equals("/api/payments/webhook")
//             && method == HttpMethod.POST) {
//
//         return chain.filter(exchange);
//     }
//     if (method == HttpMethod.POST &&
//             (path.equals("/api/payments/webhook")) ){
//          System.out.println("in api-gateway : webhook");
//         return chain.filter(exchange);
//     }
   
     
  // Recent 10 Payments - ADMIN only
     if (path.equals("/api/payments/recent")
             && method == HttpMethod.GET
             && !"ROLE_ADMIN".equals(role)) {

         throw new AccessDeniedException(
                 "Only Admin can view recent payments");
     }

     // Get Payment Details - ADMIN only
     if (pathMatcher.match("/api/payments/{cfPaymentId}", path)
             && method == HttpMethod.GET
             && !"ROLE_ADMIN".equals(role)) {

         throw new AccessDeniedException(
                 "Only Admin can view payment details");
     }
        
        
        // FORWARD USER INFORMATION
        

        ServerHttpRequest modifiedRequest = request.mutate()
                .header("X-User-Id", String.valueOf(userId))
                .header("X-User-Email", email)
                .header("X-User-Role", role)
                .build();

        ServerWebExchange modifiedExchange = exchange.mutate()
                .request(modifiedRequest)
                .build();

        return chain.filter(modifiedExchange);
    }
    
    

    @Override
    public int getOrder() {
        return -1;
    }
}