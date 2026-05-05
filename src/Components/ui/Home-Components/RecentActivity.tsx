"use client";

import { useFollowStore } from "@/Store/useFollowStore";
import { Heart, UserRound , MessageCircle , UserPlus } from "lucide-react";
import { useAuthStore } from '@/Store/useAuthStore';
import { formatRelativeTime } from '@/lib/formatDate';
  

const activities = [
  {
    id: 1,
    user: "Jack Smith",
    action: "liked your post about Next.js",
    time: "2m",
    icon: <Heart size={20} className="text-red-500 " />,
    iconBg: "bg-red-50",
  },
  {
    id: 2,
    user: "Burak Orkmez",
    action: "started following you",
    time: "1h",
    icon: <UserPlus size={20} className="text-blue-500" />,
    iconBg: "bg-blue-50",
  },
  {
    id: 3,
    user: "Bob Doe",
    action: "commented on your post",
    time: "3h",
    icon: <MessageCircle size={20} className="text-blue-400" />,
    iconBg: "bg-blue-50",
  },
];

export default function RecentActivity() {
      const { usersListToFollow } = useFollowStore();
      const { notifications } = useAuthStore();
  return (
    <div className={`bg-white rounded-2xl dark:border-zinc-800  border mt-3 sticky ${usersListToFollow?.length == 3 ? "top-97" : 'top-28'} right-85 dark:bg-neutral-900 border-gray-100 shadow-sm p-5 w-full max-w-sm mx-auto`}>
      <h2 className="text-xs font-medium tracking-widest text-gray-400 uppercase mb-4">
        Recent Activity
      </h2>

      <div className="flex flex-col divide-y  divide-gray-200 gap-5 ">
        {notifications?.slice(0,3).map((activity:any) => (
          <div key={activity._id} className="flex dark:border-zinc-800  items-start gap-3 pb-3">
            {/* Icon */}
            <div className={`w-9 h-9 rounded-full  flex items-center justify-center shrink-0`}>
              {activity?.type == "comment" ? <MessageCircle size={20} className="text-blue-400" /> : 
                activity?.type == "follow" ? <UserPlus size={20} className="text-blue-500" /> : <Heart size={20} className="text-red-500" /> }
            </div>

            {/* Text */}
            <div className="flex-1 items-center min-w-0 dm-sans max-w-50">
              <p className="text-sm  text-gray-700 dark:text-zinc-400  leading-snug">
                <span className="font-semibold block text-gray-900  dark:text-zinc-100">{activity.senderId?.fullname}</span>{" "}
                {activity.type == "comment" ? "commented on your post" :
                    activity.type == "follow"? "started following you": "liked your post"}
              </p>
            </div>

            {/* Time */}
            <span className="text-sm ml-auto text-gray-400 shrink-0 pt-0.5">{formatRelativeTime(activity?.createdAt)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}