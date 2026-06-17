import React, { useEffect } from "react";
import { CheckCircle } from "lucide-react";

export function EmailVerified() {

  useEffect(() => {

    console.log("EMAIL VERIFIED PAGE LOADED");

  }, []);


  return (
    <div className="w-full min-h-screen flex items-center justify-center px-4 text-white">

      <div className="bg-[#050505] border border-[#1A1A1A] p-10 text-center max-w-md shadow-2xl">

        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />

        <h1 className="text-2xl font-bold mb-3">
          Email Verified Successfully
        </h1>


        <p className="text-gray-400 text-sm mb-6">
          Your Scour Boy account is now verified.
          You can continue to your dashboard.
        </p>


        <button
          onClick={() => {
            window.location.pathname = "/";
          }}
          className="bg-cyan-500 text-black px-6 py-3 font-bold uppercase text-xs tracking-widest"
        >
          Go To Dashboard
        </button>


      </div>

    </div>
  );
}