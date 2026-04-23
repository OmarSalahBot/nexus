import React from 'react'
import UserHeader from './ui/header-components/UserHeader';

function header() {
  return (
    <div className='flex px-10 py-2 border-b-1  border-zinc-200 fixed top-0 w-full dark:border-zinc-300/10 backdrop-blur-md  bg-white/30 z-100 
    dark:bg-zinc-900/60 transition-colors duration-300 ' >
        <div className="logo flex gap-2 items-center">
            <div className='bg-sky-500 rounded-full w-3 h-3  '></div>
            <h1 className='text-zinc-950 font-bold text-2xl dark:text-white '> Nexus </h1>
        </div>
        <UserHeader/>
    </div>
  )
}

export default header;