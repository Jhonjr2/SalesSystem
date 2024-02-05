"use client"
import React, { useState, useEffect } from "react";
import { UserAuth } from "../context/AuthContext";

const Login = () => {
    const { user, googleSignIn, logOut } = UserAuth();
    const [loading, setLoading] = useState(true);

    const handleSignIn = async () => {
        try {
            await googleSignIn();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const checkAuthentication = async () => {
            await new Promise((resolve) => setTimeout(resolve, 50));
            setLoading(false);
        };
        checkAuthentication();
    }, [user]);

    return (
        <div className="w-full flex items-center justify-between p-20">
            <div className="flex items-center">
                <div className="mr-8">
                    <h1 className="max-w-[400px] text-6xl font-bold mb-7">Lorem ipsum dolor</h1>
                    <p className="max-w-[500px] mb-20">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis totam, perferendis veniam, porro qui, fugit ipsam laboriosam maxime nobis nulla odio quaerat accusantium.
                    </p>
                    <button onClick={handleSignIn} className="bg-blue-500 text-white px-9 py-4 rounded hover:bg-blue-700">
                        Login
                    </button>
                </div>
            </div>
            <img src="./imge_login.png" alt="image home" className="w-110 h-auto" />
        </div>



    );
};

export default Login;
