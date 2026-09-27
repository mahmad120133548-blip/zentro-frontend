import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import Login from "./Pages/Login";
import CustomerRegistration from "./Pages/CustomerRegistration";
import VendorRegistration from "./Pages/VendorRegistration";
import VendorProduct from "./Pages/VendorProduct";
import Cart from "./Pages/CustomerCart";
import ViewProduct from "./Pages/ViewProduct";
import AllProducts from "./Pages/AllProduct";
import CategoryProducts from "./Pages/CategoryPage";
import Checkout from "./Pages/Checkout";
import Dashboard from "./Pages/superadmin/Dashboard";
import Vendors from "./Pages/superadmin/Vendors";
import PendingApprovals from "./Pages/superadmin/PendingApprovals";
import Settings from "./Pages/superadmin/Settings";
import VendorDashboard from "./Pages/vendorDashboard/Dashboard";
import Products from "./Pages/vendorDashboard/Products";
import AddProduct from "./Pages/vendorDashboard/Addproduct";
import Orders from "./Pages/vendorDashboard/Order";
import ViewOrder from "./Pages/vendorDashboard/ViewOrder";
import MyStore from "./Pages/vendorDashboard/MyStore";
import SeeProduct from "./Pages/vendorDashboard/ViewProduct";
import EditProduct from "./Pages/vendorDashboard/EditProduct";
import ForgotPassword from "./Pages/ForgetPassword";
import ResetPassword from "./Pages/ResetPassword";
import About from "./Pages/About";
import RouteAccess from "./Components/RouteAccess";
import PrivacyPolicy from "./Pages/PrivacyPolicy";

function App() {
  return (
    <BrowserRouter>
    <RouteAccess>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
         <Route path="/login" element={<Login />} />
         <Route path="/register/customer" element={<CustomerRegistration/>} />
         <Route path="/register/vendor" element={<VendorRegistration />}/>
          <Route path="/vendors/:vendorId" element={<VendorProduct />}/>
          <Route path="/cart" element={<Cart />}/>
          <Route path="/product/:productId" element={<ViewProduct />}/>
          <Route path="/products" element={<AllProducts />} />
          <Route path="/categories/:categorySlug" element={<CategoryProducts/>} />
          <Route path="/checkout" element={<Checkout/>} />
          <Route path="/admin/dashboard" element={ <Dashboard/>} />
          <Route path="/admin/vendors" element={   <Vendors/> } />
           <Route path="/admin/pending-approvals" element={  <PendingApprovals/>} />
           <Route path="/admin/settings" element={  <Settings/>} />
            <Route path="/vendor/dashboard" element={<VendorDashboard/>} />
             <Route path="/vendor/products" element={<Products/>} />
             <Route path="/vendor/products/add" element={<AddProduct/>} />
              <Route path="/vendor/orders" element={<Orders/>} />
              <Route path="/vendor/orders/:orderId"  element={<ViewOrder/>}/>
               <Route path="/vendor/store"  element={<MyStore/>}/>
               <Route path="/vendor/products/:productId" element={<SeeProduct/>}/>
               <Route path="/vendor/products/edit/:productId"element={<EditProduct/>}/>
                <Route path="/forgot-password"element={<ForgotPassword/>}/>
                 <Route path="/reset-password"element={<ResetPassword/>}/>
                 <Route path="/about"element={<About/>}/>
                 <Route path="/privacy"element={<PrivacyPolicy/>}/>
             
             
             
      
           
         
      
         
      </Routes>
      </RouteAccess>
    </BrowserRouter>
  );
}

export default App;