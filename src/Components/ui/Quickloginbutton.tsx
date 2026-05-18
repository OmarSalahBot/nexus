"use client";

import { UserRound, ArrowRight } from "lucide-react";
import { useAuthStore } from "@/Store/useAuthStore";


export default function QuickLoginButton() {

    const { login , user } = useAuthStore();
    
    const handleLogin = ()=>{
      login({ email:"kareem.sol@italks.com", password:"K@reem!99#Safe"});
    }

  return (
    <button
      onClick={()=> handleLogin()}
      className="flex items-center absolute top-45 left-120 gap-3 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 transition-colors"
    >
      <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center shrink-0">
        <UserRound size={14} className="text-white" strokeWidth={1.8} />
      </div>
      <div className="text-left">
        <p className="text-sm font-medium text-gray-900 dark:text-white leading-tight">Demo Account</p>
        <p className="text-xs text-gray-400">one click login</p>
      </div>
      <ArrowRight size={14} className="text-blue-500 shrink-0 ml-1" />
    </button>
  );
}