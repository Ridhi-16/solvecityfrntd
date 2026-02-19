import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import Chat from "../User/Chat/Chat";
import ChatWidget from "../user/chat/ChatWidget";
// import FloatingAI from "../User/FloatingAI";
// import { MoonLoader } from "react-spinners";
// import CropBubble from "../pages/CropBubble";

export default function Layout(){
     
    
    return(
        <>
        
        <Header/>
        <Outlet/>
        {/* <CropBubble/> */}
        <Footer/>
        {/* <FloatingAI/> */}
        <ChatWidget/>
        </>
    )
}