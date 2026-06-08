import { createBrowserRouter } from "react-router";

// Layouts
import PublicLayout from "../layouts/PublicLayout";
import AuthLayout from "../layouts/AuthLayout";
import CustomerLayout from "../layouts/CustomerLayout";
import VendorLayout from "../layouts/VendorLayout";
import AdminLayout from "../layouts/AdminLayout";

// Pages
import Products from "../pages/public/products/Product";
import ProductDetails from "../pages/public/products/ProductDetails";
import CustomerLogin from '../pages/auth/CustomerLogin'
import VendorSignup from '../pages/auth/VendorSignup'
import VendorLogin from "../pages/auth/VendorLogin"
import AdminLogin from "../pages/auth/AdminLogin"
import CustomerSignup from '../pages/auth/CustmerSignup'
import CustomerProfile from '../pages/customer/profile/Profile'
import CustomerOrders from '../pages/customer/orders/Orders'
import VendorDashboard from '../pages/vendor/dashboard/Dashboard'
import VendorProfile from '../pages/vendor/profile/Profile'
import AdminDashboard from '../pages/admin/dashboard/pages/Dashboard'
import AdminProfile from '../pages/admin/profile/Profile'


export const router = createBrowserRouter([
  // Public Routes
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <Products />,
      },
      {
        path: "products/:id",
        element: <ProductDetails />,
      },
    ],
  },

  // Auth Routes
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "customer/login",
        element: <CustomerLogin />,
      },
      {
        path: "customer/signup",
        element: <CustomerSignup />,
      },
      {
        path:"vendor/login",
        element:<VendorLogin/>,
      },
       {
        path:"vendor/signup",
        element:<VendorSignup/>,
      },
       {
        path:"admin/login",
        element:<AdminLogin />,
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
        path: "profile",
        element: <AdminProfile />,
      },
    ],
  },
]);
