import React from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import AdminLogin from './Login/AdminLogin'
import CustomerLogin from './Login/CustomerLogin'
import Dashboard from './Admin/Dashboard'
import CustomerReg from './Register/CustomerReg'
import LandingPage from './components/LandingPage'
import { Toaster } from 'react-hot-toast'
import CHomepage from './Customer/CHomepage'
import AddFood from './Admin/AddFood'
import ManageFood from './Admin/ManageFood'
import UpdateFood from './Admin/UpdateFood'
import ProductDetail from './Customer/ProductDetail'
import Cart from './Customer/Cart'
import RazorpayCheckout from './Customer/RazorpayCheckout'
import OrdersHistory from './Customer/OrderHistory'
import PaymentForm from './Customer/PaymentForm'
import Payment from './Customer/Payment'
import ManageStaff from './Admin/ManageStaff'
import StaffSetPassword from './Login/StaffSetPassword'
import StaffLogin from './Login/StaffLogin'
import StaffHomePage from './Staff/StaffHome'
import StaffProfile from './Staff/StaffProfile'
import ManageOrders from './Admin/ManageOrders'
import StockInventory from './Inventory/StockInventory'
import StaffOrders from './Staff/StaffOrders'
import Homepage from './components/Homepage'
import StaffInventory from './Staff/StaffInventory'

function AppRouter() {
  return (
    <div>
      <Router>
        <Routes>

          {/* <Route path="*" element={}></Route> */}
          <Route path='/' element={<Homepage />}></Route>
          
          {/* <Route path='/' element={<LandingPage />}></Route> */}
          <Route path='/adminlogin' element={<AdminLogin />}></Route>
          <Route path='/dashboard' element={<Dashboard />}></Route>
          <Route path='/addFood' element={<AddFood />}></Route>
          <Route path='/manageFood' element={<ManageFood />}></Route>
          <Route path='/manageorders' element={<ManageOrders />}></Route>
          <Route path='/managestaff' element={<ManageStaff />}></Route>
          <Route path='/updfood/:id' element={<UpdateFood />}></Route>

          <Route path='/staffsetpwd' element={<StaffSetPassword />}></Route>
          <Route path='/stafflogin' element={<StaffLogin />}></Route>
          <Route path='/staffhome' element={<StaffHomePage />}></Route>
          <Route path='/staffprofile' element={<StaffProfile />}></Route>
          <Route path='/stafforders' element={<StaffOrders />}></Route>
          <Route path='/staffinventory' element={<StaffInventory />}></Route>

          <Route path='/product/:id' element={<ProductDetail />}></Route>
          <Route path='/cart' element={<Cart />}></Route>
          {/* <Route path='/payment' element={<PaymentForm />}></Route> */}
          <Route path='/payment' element={<Payment />}></Route>
          <Route path='/checkout' element={<RazorpayCheckout />}></Route>
          <Route path='/orders' element={<OrdersHistory />}></Route>
          
          <Route path='/customerreg' element={<CustomerReg />}></Route>
          <Route path='/custlogin' element={<CustomerLogin />}></Route>
          <Route path='/homepage' element={<CHomepage />}></Route>

          <Route path='/stock' element={<StockInventory />}></Route>

        </Routes>
      </Router>
      <Toaster />
    </div>
  )
}

export default AppRouter
