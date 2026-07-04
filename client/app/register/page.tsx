"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { register } from "@/services/authService";

export default function RegisterPage() {

    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const handleRegister = async () => {
        try {
            setLoading(true);
            await register({ name, email, password });
            alert("Registration successful!");
            router.push("/login");
        } catch (error) {
            if (axios.isAxiosError(error)) {
                alert(error.response?.data.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.12),transparent_35%),linear-gradient(to_bottom_right,#f8fbff,#eef6ff,#e7f2ff)]">
            <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
                <h1 className="text-3xl font-bold mb-6 text-center">
                    Register
                </h1>
                <div className="space-y-4">
                    <div>
                        <label className="block mb-2 font-medium">
                            Name
                        </label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full border rounded-lg p-3" />
                    </div>
                    <div>
                        <label className="block mb-2 font-medium">
                            Email
                        </label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border rounded-lg p-3" />
                    </div>
                    <div>
                        <label className="block mb-2 font-medium">
                            Password
                        </label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border rounded-lg p-3" />
                    </div>
                    <button onClick={handleRegister} disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg">
                        {loading ? "Registering..." : "Register"}
                    </button>
                </div>
                <p className="text-center mt-6 text-sm">
                    Already have an account?{" "}
                    <Link href="/login" className="text-blue-600 hover:underline font-semibold">
                        Login
                    </Link>
                </p>
            </div>
        </main>
    );
}