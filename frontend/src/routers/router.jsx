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
import Login from '../pages/auth/Login'
import Signup from '../pages/auth/Signup'
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

export const router = createBrowserRouter([
  // Public Routes
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <VendorProduct />,
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
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
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
        path: "profile",
        element: <AdminProfile />,
      },
    ],
  },
]);
