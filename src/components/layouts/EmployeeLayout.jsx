import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { MoonLoader } from "react-spinners";
import EmployeeHeader from "./EmployeeHeader";
// import Chat from "../User/Chat/Chat";
import ChatWidget from "../user/chat/ChatWidget";
// import CropBubble from "../pages/CropBubble";


export default function EmployeeLayout(){
    
    let isLogin=sessionStorage.getItem("isLogin")
    let role=sessionStorage.getItem("role")
    let nav=useNavigate()
    useEffect(()=>{
        if(!isLogin || role!="employee"){
            toast.error("Please login to access this page")
            nav("/login")
        }
    },[isLogin])


    


    return(
        <>
        
        <EmployeeHeader/>
        <Outlet/>
        <ChatWidget/>
         {/* <CropBubble/> */}
        {/* <Footer/> */}
        </>
    )
}