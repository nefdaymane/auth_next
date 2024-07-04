"use client"
import React, {useEffect,useState} from "react"

import axios from "axios"
import Link from "next/link"

const VerifyEmailPage = () => {

    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState("");

    const verifyUserEmail = async () => { 
        try {
            const response = await axios.post("/api/users/verifyemail", {token});
            setVerified(true);
            console.log(verified);
        } catch (error:any) {
            setError(error.response.data.error);
            console.log(error);
        }
    }

    useEffect(() => {
        const urlToken  = window.location.search.split("=")[1];
        setToken(urlToken || "");
    },[])

    useEffect(() => {
        if(token.length > 0) {
            verifyUserEmail();
        }
    }, [token])

  return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
          <h1 className="text-4xl font-bold">Verify Email</h1>
          <h2 className="m-3 p-2 bg-orange-500 text-black">{token ? `${token}` : "no token"}</h2>
          
          {verified && (
              <div >
                  <h2 className="m-2 p-2 bg-green-500 ">Email verified successfully</h2>
                  <Link href="/login">
                    Login
                  </Link>
              </div>
              
          )}
          
            {error && (
                <h2 className="p-2 bg-red-500 text-black">{error}</h2>
            )}
      </div>
  )
}

export default VerifyEmailPage


