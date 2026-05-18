"use client";

import Link from "next/link";

import { useEffect, useState } from "react";
import { useFollowStore } from "@/Store/useFollowStore";

interface WhoToFollowProps {
  user:any
}

export default function WhoToFollow({user}:WhoToFollowProps) {
  const [isFollowing, setIsFollowing] = useState(false);
  const { makeRemoveFollow } = useFollowStore();
  const colorsMap: Record<string, string> = {
    emerald: "#10b981",
    blue: "#3b82f6",
    purple: "#a855f7",
    orange: "#f97316",
    teal: "#14b8a6",
  };

  const userBg = colorsMap[user?.themeColor] || "#3b82f6";

  const handleFollow = (id:any) => {
    setIsFollowing(!isFollowing);
    makeRemoveFollow(id);
  }


  return (
    <>
            <div key={user._id} className="flex items-center dark:border-zinc-800  justify-between py-3 first:pt-0 last:pb-0">
              {/* Avatar + Info */}
              <div className="flex items-center  gap-3">
                <div className={`w-11 h-11 rounded-full select-none  flex items-center justify-center shrink-0`}  style={{ backgroundColor: userBg }}>
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
                <div>
                  <Link href={`/profile/${user?.username}`} className="text-sm  hover:underline font-semibold dm-sans text-gray-900 leading-tight dark:text-zinc-100 ">{user.fullname}</Link>
                  <p className="text-xs text-gray-400 font-mono ">@{user.username}</p>
                </div>
              </div>

              {/* Follow Button */}
              <button
                onClick={() => handleFollow(user._id)}
                className={`px-2 py-2 ml-10 w-27 flex justify-center  hover:bg-sky-500 hover:text-white rounded-full  text-sm font-medium border transition-all duration-200 ${
                      isFollowing
                        ? "bg-blue-500 text-white border-blue-500 hover:bg-blue-600"
                        : "border-gray-300 dark:border-white/20 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/10"
                    }`}
              >
                {isFollowing ? "Following" : "Follow"}
              </button>
            </div>



    </>
  );
}