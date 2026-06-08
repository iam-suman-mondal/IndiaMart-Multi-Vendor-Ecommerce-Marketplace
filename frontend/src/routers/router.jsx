import { createBrowserRouter } from "react-router";

// Layouts
import PublicLayout from "../layouts/PublicLayout";
import AuthLayout from "../layouts/AuthLayout";
import CustomerLayout from "../layouts/CustomerLayout";
import VendorLayout from "../layouts/VendorLayout";
import AdminLayout from "../layouts/AdminLayout";

// Pages
import Products from "../pages/public/products/Product";
import CustomerLogin from '../pages/auth/CustomerLogin'
import VendorSignup from '../pages/auth/VendorSignup'
import VendorLogin from "../pages/auth/VendorLogin"
import AdminLogin from "../pages/auth/AdminLogin"
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
import AdminCategories from '../pages/admin/category/pages/Category'
import PublicHome from "../pages/public/public_home/pages/home_page";
import CategoryPage from "../pages/public/public_home/pages/Category_page";

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
        path: 'Products',
        element: <AdminProducts />
      },
      {
        path: 'categories',
        element: <AdminCategories />
      },
      {
        path: "profile",
        element: <AdminProfile />,
      },
    ],
  },
]);
