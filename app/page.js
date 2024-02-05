"use client"
import React, { useState, useEffect } from "react";
import { UserAuth } from "./context/AuthContext";
import { useRouter } from "next/navigation";


const Login = () => {
  const { user, googleSignIn, logOut } = UserAuth();
  const [loading, setLoading] = useState(true);
  const router = useRouter();


  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
    
    router.push("/NewSale")
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    };
    checkAuthentication();
  }, [user]);

  return (
    <div className="w-full flex flex-col md:flex-row justify-center items-center p-10 md:p-20">
      <div className="md:mr-8 text-center md:text-left">
        <h1 className="max-w-[700px] text-4xl md:text-6xl font-bold mb-3 md:mb-7">
          Lorem ipsum dolor
        </h1>
        <p className="max-w-[600px]  mb-10">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis totam, perferendis veniam, porro qui, fugit ipsam laboriosam maxime nobis nulla odio quaerat accusantium.
        </p>
        <button onClick={handleSignIn} className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-700">
          Login
        </button>
      </div>
      <img src="./imge_login.png" alt="image home" className="w-90 h-auto" />
    </div>



  );
};

export default Login;
