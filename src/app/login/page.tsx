"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Moon, Sun } from "lucide-react";
import { useAuthStore } from "@/Store/useAuthStore";
import { useRouter } from 'next/navigation';
import QuickLoginButton from "@/Components/ui/Quickloginbutton";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [dark, setDark] = useState(false);
  const { login , user } = useAuthStore();
  const router = useRouter();
  const [dataForm , setDataForm] = useState({
    email:"",
    password:""
  });
  console.log(dataForm);
  useEffect(()=>{
    if(user){
      router.push('/');
    }
  },[user,router]);

  const handleChange = (e :any )=> {
    setDataForm((f) => ({...f , [e.target.name]:e.target.value }));
  }

  const handleSubmit = (e:any)=> {
    e.preventDefault();
    login(dataForm);
  }

  return (

      <div className="min-h-screen bg-gray-100 dark:bg-[#0f0f0f] flex flex-col transition-colors duration-300">

        {/* Main */}
        <div className="flex-1 flex  items-center justify-center px-4 py-12">
          <div className="w-full max-w-md">

            {/* Card */}
            <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm p-8">

              {/* Header */}
              <div className="mb-8 text-center">
                <div className="flex items-center justify-center gap-2 mb-6">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                  <span className="font-bold text-gray-900 dark:text-white text-xl tracking-tight">Nexus</span>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Welcome back</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Sign in to your account to continue</p>
              </div>

              {/* Form */}
              <div className="space-y-4">
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"

                    onChange={(e) => handleChange(e)}
                    placeholder="you@example.com"
                    className="w-full px-4 py-2.5 dark:placeholder:text-zinc-100 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Password */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Password
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      onChange={(e) => handleChange(e)}
                      placeholder="*******"
                      className="w-full px-4 py-2.5 pr-11 dark:placeholder:text-zinc-100 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {/* Submit */}
                <button
                  onClick={(e)=>handleSubmit(e)}
                  className="w-full py-2.5 rounded-xl bg-blue-500 hover:bg-blue-600 active:scale-[.98] text-white text-sm font-semibold transition-all duration-150 mt-2"
                >
                  
                  Sign In
                </button>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3 my-6">
                <div className="flex-1 h-px bg-gray-200 dark:bg-white/10" />
                <span className="text-xs text-gray-400">Coming Soon</span>
                <div className="flex-1 h-px bg-gray-200 dark:bg-white/10" />
              </div>

              {/* Social */}
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors text-sm font-medium text-gray-700 dark:text-gray-300">
                  <svg width="16" height="16" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Google
                </button>
                <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors text-sm font-medium text-gray-700 dark:text-gray-300">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </button>
              </div>

              {/* Footer */}
              <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="text-blue-500 hover:text-blue-400 font-medium transition-colors">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
  );
}
