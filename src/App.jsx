import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import { Bounce, ToastContainer } from 'react-toastify'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/layouts/Layout'
import Home from './components/pages/Home'
import Rooms from './components/pages/Rooms'
import Amenities from './components/pages/Amenities'
import Login from './components/auth/Login'
import About from './components/pages/About'
import Contact from './components/pages/Contact'
import Register from './components/auth/Register'
import AddEmployee from './components/admin/employees/AddEmployee'
import AdminLayout from './components/layouts/AdminLayout'
import AdminDashboard from './components/admin/AdminDashboard'
import AddCategory from './components/admin/category/AddCategory'
import AllCategory from './components/admin/category/AllCategory'
import UpdateCategory from './components/admin/category/UpdateCategory'
import ManageUsers from './components/admin/user/ManageUsers'
import AllEmployee from './components/admin/employees/AllEmployee'
import AddIssues from './components/user/issues/AddIssues'
import AllIssues from './components/admin/issues/AllIssues'
import UpdateIssues from './components/user/issues/UpdateIssues'


import EmployeeLayout from './components/layouts/EmployeeLayout'
// import EmployeeDashboard from './components/employees/EmployeeDashboard'
import UpdateEmployee from './components/admin/employees/UpdateEmployee'

import CheckIssues from './components/admin/issues/CheckIssues'
import ViewIssues from './components/user/issues/ViewIssues'
import ViewCategories from './components/user/category/ViewCategories'
import MyIssues from './components/user/issues/MyIssues'
import AssignIssue from './components/admin/issues/AssignIssue'
import Footer from './components/layouts/Footer'


import ManageIssues from './components/employee/issues/ManageIssues.jsx'
import EmployeeIssue from './components/employee/issues/EmployeeIssue.jsx'
import EmployeeDashboards from './components/employee/EmployeeDashboards.jsx'


function App() {
  

  return (
    <>
      
     <BrowserRouter>
        <Routes>

          <Route path="/" element={<Layout />}>
            <Route index element={<Home/>} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="room" element={<Rooms />} />
            <Route path="amenities" element={<Amenities />} />
            <Route path="viewcategories" element={<ViewCategories />} />




            



            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />

            <Route path="issues/add" element={<AddIssues />} />
        
            <Route path="issues/view" element={<ViewIssues/>} />

            <Route path="myissues" element={<MyIssues/>} />

            <Route path="issues/update/:id" element={<UpdateIssues />} />
            

          

 
          </Route>



          <Route path="/admin" element={<AdminLayout/>}>
            <Route index element={<AdminDashboard />} />
            <Route path="employee/add" element={<AddEmployee />} />
            <Route path="category/add" element={<AddCategory />} />
            <Route path="category/all" element={<AllCategory />} />
            <Route path="category/update/:id" element={<UpdateCategory />} />

               <Route path="issues/all" element={<AllIssues/>} />
            <Route path="users" element={<ManageUsers />} />
            <Route path="employees" element={<AllEmployee />} />
            <Route path="employees/update/:id" element={<UpdateEmployee/>} />

            

               <Route path="assign/issue/:id/:userId" element={<AssignIssue/>} />


            <Route path="Checkissues/:id" element={<CheckIssues />} /> 



          </Route>



          <Route path="/employee" element={<EmployeeLayout />}>
            <Route index element={<EmployeeDashboards/>} />
            
      <Route path="issues/manage" element={<ManageIssues/>} />
       <Route path="employeeissues/:id" element={<EmployeeIssue/>} />


           
          </Route>

      


        </Routes>
      </BrowserRouter>


     <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}


      />

{/* <Footer/> */}

    </>
  )
}

export default App
