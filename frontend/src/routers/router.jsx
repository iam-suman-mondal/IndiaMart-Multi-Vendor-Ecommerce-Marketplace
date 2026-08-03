import { createBrowserRouter } from "react-router";

// Layouts
import PublicLayout from "../layouts/PublicLayout";
import AuthLayout from "../layouts/AuthLayout";
import CustomerLayout from "../layouts/CustomerLayout";
import VendorLayout from "../layouts/VendorLayout";
import AdminLayout from "../layouts/AdminLayout";

// Pages
import Login from '../pages/auth/Login'
import VendorSignup from '../pages/auth/VendorSignup'

// import AdminLogin from "../pages/auth/AdminLogin"
import CustomerSignup from '../pages/auth/CustmerSignup'
import ProductDetails from "../pages/public/public_home/components/ProductDetails"
import CustomerProfile from '../pages/customer/profile/Profile'
import CustomerOrders from '../pages/customer/orders/Orders'
import VendorDashboard from '../pages/vendor/dashboard/Dashboard'
import VendorProduct from '../pages/vendor/products/Product'
import VendorAddProduct from "../pages/vendor/products/AddProduct";
import VendorProductDetails from "../pages/vendor/products/ProductDetails";
import VendorProfile from '../pages/vendor/profile/Profile'
import VendorUpdateProfile from '../pages/vendor/profile/UpdateProfile'
import VendorOrders from '../pages/vendor/orders/Orders'
import AdminDashboard from '../pages/admin/dashboard/pages/Dashboard'
import AdminProfile from '../pages/admin/profile/Profile'
import Orders from "../pages/customer/orders/Orders";
import AdminVendors from '../pages/admin/vendor/pages/Vendors'
import AdminCustomers from '../pages/admin/customers/pages/Customers'
import AdminProducts from '../pages/admin/products/pages/Products'
import AdminOrders from '../pages/admin/orders/pages/Orders'
import AdminPayments from '../pages/admin/payments/pages/Payments'
import PublicHome from "../pages/public/public_home/pages/Home_page";
import CategoryPage from "../pages/public/public_home/pages/Category_page";
import ForgotPassword from "../pages/auth/ForgotPassword";
import VerifySignup from "../pages/auth/VerifySignup";
import ResetPassword from "../pages/auth/ResetPassword";
import VendorVerifySignup from "../pages/auth/VendorVerifySignup";
import SearchResults from "../pages/public/public_home/pages/search_result";
import CartPage from "../pages/customer/cart/Cart"
import Checkout from "../pages/customer/PaymentPage/Checkout";
import PaymentInProcess from "../pages/customer/PaymentStatusPage/PaymentInProcess";
import SuccessPaymentPage from "../pages/customer/PaymentStatusPage/SuccessPaymentPage";
import FailedPaymentPage from "../pages/customer/PaymentStatusPage/FailedPaymentPage";

export const router = createBrowserRouter([
  // Public Routes
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <PublicHome/>,
      },
      {
        path: "category/:category",
        element: <CategoryPage />,
      },
      {
        path: "product/:id",
        element: <ProductDetails />,
      },
      {
      path: "search",
      element: <SearchResults />,
      },
      {
        path : "cart",
        element: <CartPage/>,
      }
       
    ],
  },

  // Auth Routes
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "customer/login",
        element: <Login />,
      },
      {
        path: "customer/signup",
        element: <CustomerSignup />,
      },
      {
    path:"customer/verifysignup",
      element:<VerifySignup/>
      },
      {
        path:"forgotPassword",
        element:<ForgotPassword/>
      },
      {
        path:"resetPassword",
        element:<ResetPassword/>
      }
      ,
      {
        path:"vendor/login",
        element:<Login/>,
      },
       {
        path:"vendor/signup",
        element:<VendorSignup/>,
      },
      {
    path:"vendor/verifysignup",
      element:<VendorVerifySignup/>
      },
       {
        path:"admin/login",
        element:<Login />,
      },
      
    ],
  },

  // Customer Routes
  {
    path: "/customer",
    element: <CustomerLayout />,
    children: [
      {
        path: "profile",
        element: <CustomerProfile />,
      },
      {
        path: "orders",
        element: <CustomerOrders />,
      },
      {
        path: "order_summury",
        element: <Checkout/>
      },
       {
        path: "process-payment",
        element: <PaymentInProcess/>
      }
      ,
       {
        path: "success-payment",
        element: <SuccessPaymentPage/>
      }
      , {
        path: "failed-payment",
        element: <FailedPaymentPage/>
      }
    ],
  },

  // Vendor Routes
  {
    path: "/vendor",
    element: <VendorLayout />,
    children: [
      {
        index: true,
        element: <VendorDashboard />,
      },
       {
        path: "products",
        element: <VendorProduct />,
      },
       {
        path: "products/add",
        element: <VendorAddProduct />,
      },
         {
        path: "products/:id",
        element: <VendorProductDetails />,
      },
      {
        path: "orders",
        element: <VendorOrders/>,
      },
       {
        path: "profile/edit",
        element: <VendorUpdateProfile />,
      },
      {
        path: "profile",
        element: <VendorProfile />,
      },
     
    ],
  },

  // Admin Routes
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
      {
        path: 'vendors',
        element: <AdminVendors />
      },
      {
        path: 'customers',
        element: <AdminCustomers />
      },
      {
        path: 'products',
        element: <AdminProducts />
      },
      {
        path: 'orders',
        element: <AdminOrders />
      },
      {
        path: 'payments',
        element: <AdminPayments />
      },
      {
        path: "profile",
        element: <AdminProfile />,
      },
    ],
  },
]);
