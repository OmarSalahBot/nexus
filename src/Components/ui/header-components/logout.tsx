'use client'
import React, { useEffect } from 'react'
import { LogOut , UserPen  } from 'lucide-react';
import { useRouter } from 'next/navigation';
import  { useAuthStore } from "@/Store/useAuthStore";
import Link from 'next/link';

function logout() {
    const router = useRouter();
    const { logout } = useAuthStore();

    const handleClick = async () =>{
        logout();
        router.push('/login');
    }


  return (
    <div className="absolute flex-col right-2 top-17 h-fit flex justify-center rounded-lg items-center  bg-white dark:bg-[#1a1a1a] border  border-gray-200 dark:border-white/10 shadow-xl shadow-black/10 dark:shadow-black/40 z-50 overflow-hidden">
        <Link href='/edit-profile'  className='flex justify-center hover:dark:text-white gap-2  items-center text-lg  dark:text-zinc-200 font-medium text-gray-500 hover:bg-sky-400  hover:dark:bg-sky-800 py-3 px-4 hover:text-white duration-300 '> Edit Profile  <UserPen  strokeWidth={2} size={20} />  </Link>
        <a  onClick={handleClick}  className='flex justify-center w-full border-t-1 hover:dark:text-white gap-2  items-center text-lg font-medium cursor-pointer dark:text-red-700 text-red-500 hover:bg-red-400  hover:dark:bg-red-800/20 py-3 px-4 hover:text-white duration-300 '> logout  <LogOut strokeWidth={3} size={20} />  </a>

    </div>
  )
}

export default logout