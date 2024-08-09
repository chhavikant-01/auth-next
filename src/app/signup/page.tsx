"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { axios } from "axios";


export default function SignupPage(){
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",  
    });
    const onSignup = async () => {

    }
    return (
        <div className="flex justify-center flex-col">
            <h1 className="text-2xl">Signup</h1>
            <br />
            <label htmlFor="username">username</label>
            <input className=""
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
            <input className=""
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
            <input className=""
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
                Signup Here
            </button>
            <Link
                href="/login"
            >
                Visit login page
            </Link>
        </div>
    )
}