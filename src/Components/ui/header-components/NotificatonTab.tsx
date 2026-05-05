"use client";

import { useState, useRef, useEffect } from "react";
import { Bell, Heart, UserPlus, MessageCircle } from "lucide-react";




interface NotificationProps {
  notifications :any,
}

export default function NotificationTab( { notifications }:NotificationProps) {



  return (
    <>

      {/* Dropdown */}

        <div className="absolute right-2 top-17 w-72 bg-white dark:bg-[#1a1a1a] rounded-2xl border border-gray-200 dark:border-white/10 shadow-xl shadow-black/10 dark:shadow-black/40 z-50 overflow-hidden">

          <p className="text-sm font-bold text-gray-900 dark:text-white px-4 py-3 border-b border-gray-100 dark:border-white/10">
            Notifications
          </p>

          <div className="divide-y divide-gray-100 no-scrollbar pb-3 z-30 overflow-y-auto h-50 dark:divide-white/10">
            { notifications ? (
              notifications?.map((n:any) => (
              <div
                key={n._id}
                className="flex items-center gap-3 px-4 py-3  transition-colors"
              >
                {n.type == "comment" ? <MessageCircle size={20} className="text-blue-400" /> : 
                n.type == "follow" ? <UserPlus size={20} className="text-blue-500" /> : <Heart size={20} className="text-red-500" /> }
                <p className="text-xs text-gray-700 dark:text-gray-300 flex-1 flex-col ">
                  <span className="font-semibold text-gray-900 text-sm dark:text-white">{n.senderId?.fullname}</span>{" "}
                  <span className="text-sm block" >
                    {n.type == "comment" ? "commented on your post" :
                    n.type == "follow"? "started following you": "liked your post"}
                  </span>
                </p>
                <span className="text-[11px] text-gray-400 shrink-0">{n.time}</span>
              </div>
            ))
            ) : <div className="flex justify-center items-center h-20 font-semibold text-gray-500 "> No Notifications</div> }
          </div>

        </div>
    </>
  );
}