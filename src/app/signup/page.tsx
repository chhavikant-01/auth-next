"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";


export default function SignupPage(){
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",  
    });

    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    useEffect(()=>{
        if(user.email.length >0 && user.password.length >0 && user.username.length >0){
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    },[user])

    const onSignup = async () => {
        try{
            setLoading(true)
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup response: "+response.data)
            router.push("/login")
        }catch(err: any){
            console.log("Signup failed: "+err)
            toast.error(err.message)
        }finally{
            setLoading(false)
        }
    }
    return (
        <div className="flex justify-center flex-col">
            <h1 className="text-2xl">{loading ? "Processing":"Signup"}</h1>
            <br />
            <label htmlFor="username">username</label>
            <input className="text-black"
                type="text" 
                id="username"
                value={user.username}
                onChange={
                    (e)=> setUser({...user, username: e.target.value})
                }
                placeholder="username"
            />
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
                onClick={onSignup}
            >
                {buttonDisabled ? "No signup":"Signup"}
            </button>
            <Link
                href="/login"
            >
                Visit login page
            </Link>
        </div>
    )
}