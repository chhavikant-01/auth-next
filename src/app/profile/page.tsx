"use client";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage(){
    const router = useRouter();
    const logout = async ()=>{
        try{
            await axios.get("/api/users/logout")
            toast.success("Logout successful")
            router.push("/login")
            
        }catch(err:any){
            console.log(err)
            toast.error(err.message)
    }
}
    return(
        <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100 dark:bg-gray-900">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-200">
                Profile Page
            </h2>
        </div>
        <button 
            className="max-w-md w-full py-2 mt-4 font-semibold text-white transition duration-150 ease-in-out bg-blue-600 rounded-lg hover:bg-blue-700"
            onClick={logout}
        >
            Logout
        </button>
    </div>
    )
}