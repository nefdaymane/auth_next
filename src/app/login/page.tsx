"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { set } from "mongoose";
import toast, { Toaster }  from "react-hot-toast";

const LoginPage = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  

  const onLogin = async () => {
    try {
      setLoading(true);

      const response = await axios.post("api/users/login", user);
      console.log("Login response", response);
      router.push("/profile");
      toast.success("Login successful");
      
    } catch (error: any) {
      if (error.response.status === 401) {
        toast.error("Invalid credentials");
      } else if (error.response.status === 404) { 
        toast.error("User not found");
      }else {
        toast.error("Login failed");
      }
      

    } finally {
      setLoading(false);
    }
  };

  

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-4">
      <h1 className="mb-3 text-3xl font-bold text-white text-center">
        {loading ? "Loading..." : "Login"}
      </h1>
      <hr />

      <label className="mt-2" htmlFor="email">
        Email:
      </label>
      <input
        className="p-2 border border-gray-300 mt-2 rounded-lg 
        focus:outline-none focus:border-gray-600 text-black"
        id="email"
        type="text"
        value={user.email}
        onChange={(e) => {
          setUser({ ...user, email: e.target.value });
        }}
        placeholder="email"
      />
      <label className="mt-2" htmlFor="password">
        Password:
      </label>
      <input
        className="p-2 border border-gray-300 mt-2 rounded-lg 
        focus:outline-none focus:border-gray-600 text-black"
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => {
          setUser({ ...user, password: e.target.value });
        }}
        placeholder="password"
      />

      <button
        className="mt-6 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 text-white hover:bg-gray-800 bg-gray-700"
        onClick={onLogin}
      >
        Login here
      </button>

      <Link className="mt-3 hover:text-gray-700" href="/signup">
        Visit Signup page
      </Link>
      <Toaster />
    </div>
  );
};

export default LoginPage;
