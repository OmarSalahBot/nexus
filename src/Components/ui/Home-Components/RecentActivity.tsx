"use client";

import { Heart, UserRound, MessageSquare } from "lucide-react";

const activities = [
  {
    id: 1,
    user: "Jack Smith",
    action: "liked your post about Next.js",
    time: "2m",
    icon: <Heart size={16} className="text-red-500 fill-red-500" />,
    iconBg: "bg-red-50",
  },
  {
    id: 2,
    user: "Burak Orkmez",
    action: "started following you",
    time: "1h",
    icon: <UserRound size={16} className="text-blue-500" />,
    iconBg: "bg-blue-50",
  },
  {
    id: 3,
    user: "Bob Doe",
    action: "commented on your post",
    time: "3h",
    icon: <MessageSquare size={16} className="text-blue-400" />,
    iconBg: "bg-blue-50",
  },
];

export default function RecentActivity() {
  return (
    <div className="bg-white rounded-2xl dark:border-zinc-800  border mt-3 sticky top-97 dark:bg-neutral-900 border-gray-100 shadow-sm p-5 w-full max-w-sm mx-auto">
      <h2 className="text-xs font-medium tracking-widest text-gray-400 uppercase mb-4">
        Recent Activity
      </h2>

      <div className="flex flex-col divide-y  divide-gray-200 gap-5 ">
        {activities.map((activity) => (
          <div key={activity.id} className="flex dark:border-zinc-800  items-start gap-3 pb-3">
            {/* Icon */}
            <div className={`w-9 h-9 rounded-full ${activity.iconBg} flex items-center justify-center shrink-0`}>
              {activity.icon}
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0 dm-sans max-w-50">
              <p className="text-sm text-gray-700 dark:text-zinc-400  leading-snug">
                <span className="font-semibold text-gray-900  dark:text-zinc-100">{activity.user}</span>{" "}
                {activity.action}
              </p>
            </div>

            {/* Time */}
            <span className="text-sm text-gray-400 shrink-0 pt-0.5">{activity.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}