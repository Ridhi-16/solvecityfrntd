import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import AdminHeader from "./AdminHeader";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { MoonLoader } from "react-spinners";

import ChatWidget from "../user/chat/ChatWidget";
// import CropBubble from "../pages/CropBubble";


export default function AdminLayout(){
    let isLogin=sessionStorage.getItem("isLogin")
    let role=sessionStorage.getItem("role")
    
    let nav=useNavigate()
    useEffect(()=>{
        if(!isLogin || role!="admin"){
            toast.error("Please login to access this page")
            nav("/login")
        }
    },[isLogin])


   
    return(
        <>
                <AdminHeader />

               <Outlet/>
                {/* <CropBubble/> */}
<ChatWidget/>
                {/* <Footer /> */}
           
        </>
    )
}


