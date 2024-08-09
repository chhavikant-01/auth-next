"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { axios } from "axios";


export default function LoginPage(){
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    });
    const onLogin = async () => {

    }
    return (
        <div className="flex justify-center flex-col">
            <h1 className="text-2xl">Login</h1>
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