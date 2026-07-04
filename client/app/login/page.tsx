"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/services/authService";
import Link from "next/link";
import axios from "axios";

export default function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();

    const handleLogin = async () => {
        try {
            const response = await login({
                email,
                password
            });
            console.log(response);
            localStorage.setItem("token", response.token);
            router.push("/company");
        } catch (error) {
            if (axios.isAxiosError(error)) {
                alert(error.response?.data.message);
            } else {
                alert("Something went wrong.");
            }
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.12),transparent_35%),linear-gradient(to_bottom_right,#f8fbff,#eef6ff,#e7f2ff)]">
            <div className="w-full max-w-md rounded-xl bg-white shadow-lg p-8">
                <h1 className="text-3xl font-bold text-center">
                    sERPy
                </h1>
                <p className="text-center text-gray-500 mt-2 mb-8">
                    ERP Management System
                </p>
                <div className="space-y-5">
                    <div>
                        <label className="block mb-2 font-medium">
                            Email
                        </label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-lg border p-3 outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your email" />
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">
                            Password
                        </label>

                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-lg border p-3 outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your password" />
                    </div>

                    <button onClick={handleLogin} className="w-full rounded-lg bg-blue-600 py-3 text-white font-semibold hover:bg-blue-700 transition">
                        Login
                    </button>
                    <div className="mt-4 text-center">
                        <p className="text-sm text-gray-600">
                            Don't have an account?{" "}
                            <Link href="/register" className="text-blue-600 hover:text-blue-700 font-semibold">
                                Register
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}