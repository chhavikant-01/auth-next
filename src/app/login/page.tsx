"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";


export default function LoginPage(){
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    });
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    useEffect(()=>{
        if(user.email.length >0 && user.password.length >0){
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    },[user])

    const onLogin = async () => {
        try{
            setLoading(true)
            const response = await axios.post("/api/users/login", user);
            console.log("Login response: "+response.data)
            toast.success("Login successful")
            router.push(`/profile`)
        }catch(err: any){
            console.log("Login failed: "+err)
            toast.error(err.message)
    }finally{
        setLoading(false)
    }
}
    return (
        <div className="flex justify-center flex-col">
            <h1 className="text-2xl">{loading ? "Processing":"Login"}</h1>
            <br />
            <label htmlFor="email">email</label>
            <input className="text-black"
                type="email" 
                id="username"
                value={user.email}
                onChange={
                    (e)=> setUser({...user, email: e.target.value})
                }
                placeholder="email"
            />
            <br />
            <label htmlFor="password">password</label>
            <input className="text-black"
                type="password" 
                id="password"
                value={user.password}
                onChange={
                    (e)=> setUser({...user, password: e.target.value})
                }
                placeholder="password"
            />
            <button
                onClick={onLogin}
            >
                Login Here
            </button>
            <Link
                href="/signup"
            >
                Visit signup page
            </Link>
        </div>
    )
}