"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

const Profile = () => {
  const router = useRouter();
  const [data, setData] = useState("no data");

  const logout = async () => {
    try {
      const response = await axios.get("/api/users/logout");
      console.log("Logout response", response);
      router.push("/login");
      toast.success("Logout successful");
    } catch (error: any) {
      console.log("Logout failed", error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    try {
      const response = await axios.get("/api/users/me");
      console.log("User details response", response);  
        setData(response.data.data._id);
    } catch (error: any) {
      console.log("User details failed", error.message);
      setData("no data");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-4">
      <h1 className="mb-3 text-3xl font-bold text-white text-center">
        Profile
      </h1>
      <hr />
      <p>Profile Page</p>
      <h2 className="mt-4 p-2 rounded bg-purple-400">
        {data === "no data" ? (
          "no data"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <hr />
      <button
        className="mt-6 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 text-white hover:bg-gray-800 bg-gray-700"
        onClick={logout}
      >
        Logout
      </button>

      <button
        className="mt-6 p-2 border border-purple-600 rounded-lg focus:outline-none focus:border-purple-300 text-white hover:bg-purple-800 bg-purple-700"
        onClick={getUserDetails}
      >
        Get User Details
      </button>
    </div>
  );
};

export default Profile;
