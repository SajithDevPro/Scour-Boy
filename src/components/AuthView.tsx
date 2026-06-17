import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Target, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

import { UserSession } from '../types';

import { signInWithGoogle } from '../lib/auth';
import { signup, login } from '../lib/emailAuth';
import { saveSession } from "../lib/session";


interface AuthViewProps {
  onLogin: (session: UserSession) => void;
}


export function AuthView({ onLogin }: AuthViewProps) {


  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);


  const [message, setMessage] = useState("");
  const [messageType, setMessageType] =
    useState<"success" | "error" | null>(null);



  const handleSubmit = async (
    e: React.FormEvent
  ) => {


    e.preventDefault();


    setLoading(true);

    setMessage("");
    setMessageType(null);



    try {


      let user;



      if (isLogin) {


        user = await login(
          email,
          password
        );


        const sessionUser = {

          id: user.uid,

          email: user.email || "",

          role: user.role || "free"

        };



        saveSession(sessionUser);

        onLogin(sessionUser);



      }
      else {



        const result =
          await signup(
            name,
            email,
            password
          );



        if (result.verificationSent) {


          setMessage(
            "Verification email sent successfully. Please check your inbox and verify your account before logging in."
          );


          setMessageType("success");


          setIsLogin(true);



          setPassword("");

        }


      }



    }

    catch (error: any) {


      console.error(error);



      let errorMessage =
        "Authentication failed.";



      if (
        error.code ===
        "auth/email-already-in-use"
      ) {

        errorMessage =
          "This email already has an account. Please login instead.";

      }


      else if (
        error.message.includes(
          "Please verify your email"
        )
      ) {

        errorMessage =
          "Please verify your email before login.";

      }



      setMessage(errorMessage);

      setMessageType("error");


    }

    finally {


      setLoading(false);


    }


  };




  return (

    <div className="w-full max-w-md mx-auto pt-24 pb-24 px-4 text-white">


      <motion.div

        initial={{ opacity: 0, y: 20 }}

        animate={{ opacity: 1, y: 0 }}

        className="bg-[#050505] border border-[#1A1A1A] p-8 shadow-2xl relative overflow-hidden"

      >



        <div className="flex items-center gap-2 mb-8 justify-center">

          <Target className="w-6 h-6 text-cyan-500" />


          <span className="text-xl font-bold font-serif italic tracking-wider">

            SCOUR BOY

          </span>


        </div>




        <h2 className="text-2xl font-bold text-center mb-2">

          {isLogin
            ? "Welcome Back"
            : "Create Account"}

        </h2>



        <p className="text-xs text-gray-500 text-center mb-8">

          {isLogin
            ?
            "Enter your details to access your intelligence dashboard."
            :
            "Start your elite football development journey."}


        </p>





        {
          message && (

            <div

              className={`mb-5 p-4 flex gap-3 items-start text-sm border

${messageType === "success"

                  ?

                  "border-green-500/30 bg-green-500/10 text-green-400"

                  :

                  "border-red-500/30 bg-red-500/10 text-red-400"

                }

`}

            >


              {
                messageType === "success"

                  ?

                  <CheckCircle className="w-5 h-5" />

                  :

                  <AlertCircle className="w-5 h-5" />

              }


              <p>

                {message}

              </p>


            </div>

          )

        }






        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >




          {
            !isLogin && (


              <div>


                <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">

                  Full Name

                </label>



                <input

                  type="text"

                  required

                  value={name}

                  onChange={
                    (e) => setName(e.target.value)
                  }

                  className="w-full bg-[#0A0A0A] border border-[#222] p-3 text-white focus:border-cyan-500 outline-none"

                  placeholder="Player Name"

                />


              </div>


            )

          }





          <div>


            <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">

              Email Address

            </label>



            <input

              type="email"

              required

              value={email}

              onChange={
                (e) => setEmail(e.target.value)
              }

              className="w-full bg-[#0A0A0A] border border-[#222] p-3 text-white focus:border-cyan-500 outline-none"

              placeholder="player@example.com"

            />



          </div>





          <div>


            <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">

              Password

            </label>



            <input

              type="password"

              required

              value={password}

              onChange={
                (e) => setPassword(e.target.value)
              }

              className="w-full bg-[#0A0A0A] border border-[#222] p-3 text-white focus:border-cyan-500 outline-none"

              placeholder="••••••••"

            />



          </div>


          <button

            disabled={loading}
            type="submit"
            className="w-full bg-cyan-500 text-black font-bold uppercase tracking-widest text-xs py-4 hover:bg-cyan-400 transition flex justify-center items-center gap-2"
          >


            {


              loading

                ?

                <>

                  <Loader2 className="w-4 h-4 animate-spin" />

                  Please wait

                </>

                :

                isLogin

                  ?

                  "Access Dashboard"

                  :

                  "Create Identity"


            }



          </button>





        </form>

        <button
          type="button"
          onClick={async () => {
            try {
              const user = await signInWithGoogle();

              const sessionUser = {
                id: user.id,
                email: user.email,
                role: "free"
              };

              saveSession(sessionUser);
              onLogin(sessionUser);

            } catch (err) {
              console.error(err);
            }
          }}
          className="
    w-full flex items-center justify-center gap-3
    bg-white text-black
    py-3 mt-3
    text-sm font-medium
    border border-gray-200
    shadow-sm
    hover:shadow-md hover:scale-[1.01]
    active:scale-[0.99]
    transition-all duration-200
  "
        >
          {/* Google Logo */}
          <svg
            width="18"
            height="18"
            viewBox="0 0 48 48"
            className="shrink-0"
          >
            <path
              fill="#FFC107"
              d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-4.5z"
            />
            <path
              fill="#FF3D00"
              d="M6.3 14.7l6.6 4.8C14.6 16.1 19 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 16.3 4 9.6 8.3 6.3 14.7z"
            />
            <path
              fill="#4CAF50"
              d="M24 44c5.2 0 10-2 13.6-5.3l-6.3-5.2C29.2 35.5 26.8 36 24 36c-5.3 0-9.7-3.3-11.3-7.9l-6.6 5.1C9.4 39.7 16.2 44 24 44z"
            />
            <path
              fill="#1976D2"
              d="M43.6 20.5H42V20H24v8h11.3c-1.2 3.3-4.2 6-7.3 7.1l6.3 5.2C39.1 37.6 44 31.4 44 24c0-1.3-.1-2.7-.4-3.5z"
            />
          </svg>

          Continue with Google
        </button>





        <div className="mt-6 text-center">


          <button

            onClick={() => {


              setIsLogin(!isLogin);

              setMessage("");

            }}

            className="text-[10px] uppercase text-gray-500 hover:text-white"

          >


            {

              isLogin

                ?

                "Need an account? Sign up"

                :

                "Already have an account? Log in"

            }



          </button>

        </div>
      </motion.div>


    </div>


  );

}