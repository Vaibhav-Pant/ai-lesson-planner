"use client";

import { useEffect } from "react";
import { redirect } from 'next/navigation';


const AuthRedirect = () => {

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn && window.location.pathname !== "/login") {
      redirect("/login");
    }else if(isLoggedIn){
      redirect("/lesson-planner");
    }
  }, []);

  return null; 
}


export default AuthRedirect;
