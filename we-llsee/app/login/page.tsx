"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image"
import modern_art from "@/public/Assets/scroll_art.png"
import logo from "@/public/Assets/logo.png"

export default function Login() {
    const router = useRouter();
    const [isRegister, setIsRegister] = useState(false);
    const [name, setName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    
    const passwordsMatch = password === confirmPass || !isRegister;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (isRegister) {
            if (!firstName || !email || !password || !username) {
                setError("All fields are required");
                return;
            }
            if (!passwordsMatch) {
                setError("Passwords do not match");
                return;
            }
        } else {
            if (!username || !password) {
                setError("Username and password are required");
                return;
            }
        }

        setLoading(true);

        try {
            const endpoint = isRegister 
                ? "http://127.0.0.1:8000/users/auth/register/"
                : "http://127.0.0.1:8000/users/auth/login/";

            const body = isRegister
                ? { username, email, password, name: firstName }
                : { username, password };

            console.log("Sending request to:", endpoint);
            console.log("Request body:", body);

            const response = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            const data = await response.json();
            console.log("Response:", data);

            if (response.ok) {
                if (isRegister) {
                    setSuccess("Registration successful! Please check your email to verify your account.");

                    setTimeout(() => {
                        setIsRegister(false);
                        setSuccess("");
                        setName("");
                        setEmail("");
                        setPassword("");
                        setConfirmPass("");
                    }, 2000);
                } else {
                    setSuccess("Login successful! Redirecting...");
                    
                    if (data.access) {
                        localStorage.setItem("access_token", data.access);
                    }
                    if (data.refresh) {
                        localStorage.setItem("refresh_token", data.refresh);
                    }

                    setTimeout(() => {
                        router.push("/");
                    }, 1000);
                }

                setUsername("");
                setName("");
                setEmail("");
                setPassword("");
                setConfirmPass("");
            } else {
                const errorMsg = data.detail || 
                                data.message || 
                                data.error || 
                                data.non_field_errors?.[0] ||
                                JSON.stringify(data);
                setError(errorMsg);
                console.error("Error response:", data);
            }
        } catch (err) {
            setError("Network error. Please try again.");
            console.error("Network error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="grid grid-cols-[60%_40%] gap-4 h-screen overflow-hidden">
            <div className="absolute top-5 right-5 z-50">
                <Image src={logo} alt="logo" className="rounded-full border-white shadow-lg h-17 w-17 mr-25" />
            </div>
            <div className="relative overflow-hidden h-full">
                <div className="absolute inset-0 pl-50 scroll-wrapper animate-vertical-scroll">
                    <Image src={modern_art} alt="modern art" className="w-200 object-cover"/>                    
                    <Image src={modern_art} alt="modern art duplicate" className="w-200 object-cover"/>
                </div>
            </div>
            <div className="flex h-screen bg-black-500">
                <div className="m-auto bg-black-500 p-10 max-w-md w-full ml-20">
                    <h1 className="text-4xl font-bold text-white mb-3">
                        {isRegister ? "Register" : "Sign in"}
                    </h1>

                    {error && (
                        <div className="bg-red-500/20 border border-red-500 text-red-400 p-3 rounded-lg mb-4">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="bg-green-500/20 border border-green-500 text-green-400 p-3 rounded-lg mb-4">
                            {success}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        {isRegister && (
                            <>
                                <label className="text-gray-200 text-sm">First Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter first name"
                                    className="w-full p-3 mt-1 mb-5 bg-black/30 border border-gray-600 rounded-lg text-gray-200"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </>
                        )}

                        <label className="text-gray-200 text-sm">Username</label>
                        <input
                            type="text"
                            placeholder="Enter username"
                            className="w-full p-3 mt-1 mb-5 bg-black/30 border border-gray-600 rounded-lg text-gray-200"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />

                        {isRegister && (
                            <>
                                <label className="text-gray-200 text-sm">Email</label>
                                <input
                                    type="email"
                                    placeholder="Enter email"
                                    className="w-full p-3 mt-1 mb-5 bg-black/30 border border-gray-600 rounded-lg text-gray-200"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </>
                        )}

                        <label className="text-gray-200 text-sm">Password</label>
                        <input
                            type="password"
                            placeholder="Enter password"
                            className="w-full p-3 mt-1 mb-5 bg-black/30 border border-gray-600 rounded-lg text-gray-200"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        {isRegister && (
                            <>
                                <label className="text-gray-200 text-sm">Confirm Password</label>
                                <input
                                    type="password"
                                    placeholder="Confirm password"
                                    className={`w-full p-3 mt-1 mb-5 bg-black/30 rounded-lg text-gray-200 border 
                                        ${passwordsMatch ? "border-gray-600" : "border-red-500"}`}
                                    value={confirmPass}
                                    onChange={(e) => setConfirmPass(e.target.value)}
                                />

                                {!passwordsMatch && (
                                    <p className="text-red-400 text-sm -mt-4 mb-4">
                                        Passwords do not match.
                                    </p>
                                )}
                            </>
                        )}

                        {!isRegister && (
                            <div className="flex items-center justify-between mb-6">
                                <label className="flex items-center gap-2 text-gray-300">
                                    <input type="checkbox" />
                                    Remember me
                                </label>

                                <a className="text-blue-400 hover:underline cursor-pointer">
                                    Forgot your password?
                                </a>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full ${
                                loading ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
                            } text-white p-3 rounded-lg text-lg font-semibold transition-colors`}
                        >
                            {loading ? "Processing..." : isRegister ? "Register" : "Sign in"}
                        </button>
                    </form>

                    <p className="text-gray-300 text-center mt-5">
                        {isRegister ? "Already have an account?" : "Don't have an account?"}

                        <span
                            className="text-blue-400 ml-1 hover:underline cursor-pointer"
                            onClick={() => {
                                setIsRegister(!isRegister);
                                setConfirmPass("");
                                setPassword("");
                                setEmail("");
                                setUsername("");
                                setFirstName("");
                                setError("");
                                setSuccess("");
                            }}
                        >
                            {isRegister ? "Sign in" : "Register here"}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    )
}