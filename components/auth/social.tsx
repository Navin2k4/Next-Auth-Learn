"use client";

import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Button } from "../ui/button";

// to use the sign-in in the clan component use this import 
import { signIn } from 'next-auth/react'
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const Social = () => {

  const onSocialClick = (provider: "google" | "github") => {
    signIn(provider,{
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    })
  }
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button size="lg" className="w-full bg-slate-800 text-white hover:bg-black" onClick={()=>onSocialClick('google')}>
        <FcGoogle className="h-5 w-5" />
      </Button>
      <Button size="lg" className="w-full bg-slate-800 text-white hover:bg-black" onClick={()=>onSocialClick('github')}>
        <FaGithub className="h-5 w-5" />
      </Button>
    </div>
  );
};
