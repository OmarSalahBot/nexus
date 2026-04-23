"use client";

import Link from 'next/link'
import React from 'react'
import { House ,User , Sun , Moon ,Bell } from 'lucide-react'
import { useTheme } from "next-themes"
import { usePathname } from "next/navigation";


function UserHeader() {
    const { theme , setTheme } = useTheme();
     const pathname = usePathname();

  return (
    <div className='flex w-full dm-sans '>
        {/* Tabs Home and Profile */ }
        <div className=" flex items-center ml-auto mr-auto gap-3 ">
        <Link href={'/'} className={` ${pathname == '/' ? "active-nav-link" : "nav-link" } `}> <House size={22} /> Home </Link> 
        <Link href={'/profile/omar'} className={` ${pathname == '/profile' ? "active-nav-link" : "nav-link" } `}> <User size={22} /> Profile </Link>
        </div>
        {/* Notifications, Theme, and Profile Picture */ }
        <div className=" flex justify-between items-center gap-4 ">
            {/* Theme Button */ }
                <div className="theme flex items-center ">
                    <button className='change-theme flex items-center bg-zinc-50  border-zinc-200 
                    border-2 rounded-lg p-2 dark:bg-zinc-800 dark:border-zinc-700 ' onClick={()=> setTheme(theme == 'dark' ? "light" : "dark" ) }>
                        <Sun className=' dark:hidden block text-zinc-950 dark:text-white ' />
                        <Moon className=' dark:block hidden dark:text-white text-zinc-950 dark:text-white ' />
                    </button>
            </div>
            {/* notifications button */ }
                <button className="notification-tab relative p-3 dark:hover:bg-zinc-800 hover:bg-zinc-100 duration-300 rounded-lg ">
                    <Bell size={28} className=' text-zinc-950 dark:text-white' />
                    <div className=' absolute h-2 w-2 bg-red-600 rounded-full top-2 right-3'></div>
                </button>
                {/* Profile Picture */ }
                <div className="pfp border-sky-300 dark:border-3 dark:border-sky-950/90 font-bold text-lg text-white border-3 rounded-full bg-sky-500 h-14 w-14 flex justify-center items-center"> Om </div>
            </div>
    </div>
  )
}

export default UserHeader