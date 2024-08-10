"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    });
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login response: " + response.data);
            toast.success("Login successful");
            router.push(`/profile/${response.data.user.username}`);
        } catch (err: any) {
            console.log("Login failed: " + err);
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100 dark:bg-gray-900">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
                <h1 className="text-3xl font-semibold text-center text-gray-800 dark:text-gray-200">
                    {loading ? "Processing..." : "Login"}
                </h1>

                <div className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 mt-1 text-gray-800 border rounded-lg dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 mt-1 text-gray-800 border rounded-lg dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        onClick={onLogin}
                        className={`w-full py-2 mt-4 font-semibold text-white transition duration-150 ease-in-out bg-blue-600 rounded-lg ${
                            buttonDisabled
                                ? "opacity-50 cursor-not-allowed"
                                : "hover:bg-blue-700"
                        }`}
                        disabled={buttonDisabled}
                    >
                        Login Here
                    </button>

                    <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                        Don't have an account?{" "}
                        <Link href="/signup" className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400">
                            Sign up here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
