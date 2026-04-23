"use client";

import { useState } from "react";

const users = [
  { id: 1, name: "Jack Smith",   handle: "@jacksmith",    initials: "JS", color: "bg-emerald-500" },
  { id: 2, name: "Burak Orkmez", handle: "@burakorkmezz", initials: "BO", color: "bg-blue-600"    },
  { id: 3, name: "Bob Doe",      handle: "@bobdoe",       initials: "BD", color: "bg-purple-500"  },
];

export default function WhoToFollow() {
  const [followed, setFollowed] = useState<number[]>([]);

  const toggle = (id: number) =>
    setFollowed((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );

  return (
    <div className="bg-white rounded-2xl dark:border-zinc-800 dark:bg-neutral-900 border sticky top-25 border-gray-100 shadow-sm p-5 w-full max-w-sm mx-auto">
      <h2 className="text-lg font-bold text-gray-900 dm-sans mb-4 dark:text-zinc-100 ">Who to Follow</h2>

      <div className="flex flex-col divide-y  divide-gray-200">
        {users.map((user) => {
          const isFollowing = followed.includes(user.id);
          return (
            <div key={user.id} className="flex items-center dark:border-zinc-800  justify-between py-3 first:pt-0 last:pb-0">
              {/* Avatar + Info */}
              <div className="flex items-center  gap-3">
                <div className={`w-11 h-11 rounded-full ${user.color} flex items-center justify-center shrink-0`}>
                  <span className="text-white text-sm font-bold">{user.initials}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold dm-sans text-gray-900 leading-tight dark:text-zinc-100 ">{user.name}</p>
                  <p className="text-xs text-gray-400 font-mono ">{user.handle}</p>
                </div>
              </div>

              {/* Follow Button */}
              <button
                onClick={() => toggle(user.id)}
                className={`px-2 py-2 ml-10 w-27 flex justify-center  hover:bg-sky-500 hover:text-white rounded-full  text-sm font-medium border transition-all duration-200 ${
                      isFollowing
                        ? "bg-blue-500 text-white border-blue-500 hover:bg-blue-600"
                        : "border-gray-300 dark:border-white/20 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/10"
                    }`}
              >
                {isFollowing ? "Following" : "Follow"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}