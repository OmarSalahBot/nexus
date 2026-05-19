'use client'
// components/ProfileCard.tsx
import { MapPin, Link2 , Calendar } from "lucide-react";
import { useAuthStore } from "@/Store/useAuthStore";
import { colorsMap } from '@/lib/colorsMap';


export default function UserCard() {
  const {user} = useAuthStore();



  const userBg = colorsMap[user?.themeColor] || "#3b82f6";
  
  const date = new Date(user.createdAt);
  const formattedDate = date.toLocaleDateString('en-US', {
  month: 'long',   
  year: 'numeric'  
  });

  return (
    <div className=" w-7/10 rounded-2xl min-h-90 sticky top-25    left-85 dark:border-white/10 dark:bg-neutral-900   bg-white border border-gray-100 overflow-hidden shadow-sm">
      
      {/* Cover */}
      <div className="h-24 bg-gradient-to-br from-blue-500/20 to-blue-600/10 dark:from-blue-500/10 dark:to-transparent " />

      {/* Body */}
      <div className="px-5 pb-5">

        {/* Avatar */}
        <div className="-mt-7 mb-3">
          <div className={`w-14 h-14 rounded-full select-none  flex items-center justify-center  `} style={{ backgroundColor: userBg }} >
            {user?.profilePic ? 
            (
              <img src={user?.profilePic} alt="avatar" className="w-full h-full rounded-full object-cover" />
            ) :
            (
              <span className="text-white text-sm font-semibold tracking-wide">
              {user?.fullname?.slice(0,2)}
              </span>
            ) 
          }
          </div>
        </div>

        {/* Name & handle */}
        <h2 className="text-zinc-950 dark:text-zinc-100 text-base font-bold leading-tight">
          {user.fullname}
        </h2>
        <p className="text-zinc-400 dark:text-zinc-600 text-xs font-mono mt-0.5 mb-2">
          @{user?.username}
        </p>

        {/* Bio */}
        <p className="text-zinc-500  dark:text-zinc-400 text-sm leading-relaxed mb-4">
          {user?.bio ? user.bio : "Hey there! I'm using Nexus."}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 0 gap-px bg-zinc-200 dark:bg-zinc-700 rounded-xl overflow-hidden mb-4">
          <div className="bg-zinc-50 dark:bg-zinc-800  py-2.5 text-center">
            <p className="text-zinc-950 dark:text-white dm-sans text-lg font-bold">{new Intl.NumberFormat('en-US', {
                                                                                          notation: 'compact',
                                                                                          compactDisplay: 'short',
                                                                                          maximumFractionDigits: 1
                                                                                        }).format(user.followingCount)}</p>
            <p className="text-zinc-400 text-[10px] font-semibold tracking-widest uppercase mt-0.5">
              Following
            </p>
          </div>
          <div className="bg-zinc-50 dark:bg-zinc-800 py-2.5 text-center">
            <p className="text-zinc-950 dark:text-white dm-sans text-lg font-bold">{new Intl.NumberFormat('en-US', {
                                                                                          notation: 'compact',
                                                                                          compactDisplay: 'short',
                                                                                          maximumFractionDigits: 1
                                                                                        }).format(user.followersCount)}</p>
            <p className="text-zinc-400 text-[10px] font-semibold tracking-widest uppercase mt-0.5">
              Followers
            </p>
          </div>
        </div>

        {/* Meta */}
        <div className="flex flex-col gap-2">
          
          <div className="flex items-center gap-2 text-zinc-500 text-xs">
            <MapPin size={13} className="text-zinc-400 shrink-0" />
            <span>{user.location? user.location : 'No Location'}</span>
          </div> 
              
          {formattedDate ? <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Calendar size={13} /> <span> Joined {formattedDate} </span>
                  </div>: null}
        </div>

      </div>
    </div>
  );
}