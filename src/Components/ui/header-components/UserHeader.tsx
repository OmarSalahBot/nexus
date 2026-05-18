"use client";

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { House ,User , Sun , Moon ,Bell } from 'lucide-react'
import { useTheme } from "next-themes"
import { usePathname } from "next/navigation";
import { useAuthStore } from '@/Store/useAuthStore';
import NotificationTab from './NotificatonTab';
import { colorsMap } from '@/lib/colorsMap';
import  Logout  from "@/Components/ui/header-components/logout";




function UserHeader() {
    const { theme , setTheme } = useTheme();
    const { user, openNotifications, setOpenNotifications , markAllAsRead , notifications , getAllNotifications } = useAuthStore();
    const pathname = usePathname();
    const userBg = colorsMap[user?.themeColor] || "#3b82f6";
    const [openLogout , setOpenLogout ] = useState(false);

    useEffect(()=>{
        getAllNotifications();
    },[getAllNotifications])

    const handleOpen = ()=>{
        markAllAsRead();
        setOpenNotifications(!openNotifications);
    }


  return (
    <div className='flex w-full dm-sans '>
        {openNotifications && <NotificationTab notifications={notifications} />}
        {/* Tabs Home and Profile */ }
        <div className=" flex items-center ml-auto mr-auto gap-3 ">
        <Link href={'/'} className={` ${pathname == '/' ? "active-nav-link" : "nav-link" } `}> <House size={22} /> Home </Link> 
        <Link href={`/profile/${user?.username}`} className={` ${pathname == `/profile/${user?.username}` ? "active-nav-link" : "nav-link" } `}> <User size={22} /> Profile </Link>
        </div>
        {/* Notifications, Theme, and Profile Picture */ }
        <div className=" flex justify-between items-center gap-4 ">
            {/* Theme Button */ }
                <div className="theme flex items-center  ">
                    <button className='change-theme flex cursor-pointer items-center bg-zinc-50  border-zinc-200 
                    border-2 rounded-lg p-2 dark:bg-zinc-800 dark:border-zinc-700 ' onClick={()=> setTheme(theme == 'dark' ? "light" : "dark" ) }>
                        <Sun className=' dark:hidden block text-zinc-950 dark:text-white ' />
                        <Moon className=' dark:block hidden  text-zinc-950 dark:text-white ' />
                    </button>
                </div>
            {/* notifications button */ }
                <button className="notification-tab relative p-3 cursor-pointer dark:hover:bg-zinc-800 hover:bg-gray-200/50 duration-300 rounded-lg " onClick={() => handleOpen()}>
                    <Bell size={28} className=' text-zinc-950 dark:text-white' />
                    {notifications?.length > 0 && notifications[0]?.read == false  ? <div className=' absolute h-2 w-2 bg-red-600 rounded-full top-2 right-3'></div> : null }
                </button>
                {/* Profile Picture */ }
                <button  onClick={()=> setOpenLogout(!openLogout)} className="pfp border-sky-300 cursor-pointer font-bold text-lg text-white  rounded-full  h-13 w-13 flex justify-center items-center" style={{ backgroundColor: userBg }} > 
                    {user?.profilePic ? 
            (
              <img src={user?.profilePic} alt="avatar" className="w-full h-full rounded-full object-cover" />
            ) :
            (
              <span className="text-white text-sm font-semibold tracking-wide">
              {user.fullname?.slice(0,2)}
              </span>
            ) 
          }
                     </button>
                {openLogout ? <Logout /> : null }
            </div>
    </div>
  )
}

export default UserHeader