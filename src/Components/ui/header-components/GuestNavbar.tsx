"use client";

import { Moon, Sun , House } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes"


export default function GuestNavbar() {
    const { theme , setTheme } = useTheme();
    const pathname = usePathname();

  return (
      <nav className="flex items-center justify-between w-full  transition-colors">



        {/* Right Actions */}
        <div className="flex items-center gap-2 ml-auto">
           <div className="theme flex items-center ">
                <button className='change-theme flex items-center bg-zinc-50  border-zinc-200 
                    border-2 rounded-lg p-2 dark:bg-zinc-800 dark:border-zinc-700 ' onClick={()=> setTheme(theme == 'dark' ? "light" : "dark" ) }>
                    <Sun className=' dark:hidden block text-zinc-950 dark:text-white ' />
                    <Moon className=' dark:block hidden dark:text-white text-zinc-950 dark:text-white ' />
                </button>
            </div>

          <Link
            href="/login"
            className="px-4 py-2 rounded-xl border border-gray-200 dark:border-white/10 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
          >
            Sign In
          </Link>

          <Link
            href="/signup"
            className="px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold transition-colors active:scale-[.98]"
          >
            Sign Up
          </Link>
        </div>
      </nav>
  );
}