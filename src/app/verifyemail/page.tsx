"use client"
import axios from "axios"
import Link from "next/link"
import { use, useEffect, useState } from "react"

export default function VerifyEmailPage(){

    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);
    
    const verifyUserEmail = async() => {
        try{
            const response = await axios.post("/api/users/verifyemail", {token});
            console.log(response.data);
            setVerified(true);
        }catch(err: any){
            console.log(err.response.data);
            setError(true);
        }
    }
useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
},[]);
    useEffect(() => {
        if(token.length>0){
            verifyUserEmail();
        }
    },[token]);

    return(
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-5xl">{verified ? "Email verified successfully" : "Verify email"}</h1>
            {
                verified && (
                    <Link 
                    href="/login"
                    className="text-2xl"
                    >
                        Login
                    </Link>
                )
            }
            <p className="text-3xl">{token? `${token}`: `no token`}</p>
            {
                error && (
                    <p className="text-3xl">An error occurred</p>
                    
                    )
            }
        </div>
    )
}