// components/ProfileCard.tsx
import { MapPin, Link2 , Calendar } from "lucide-react";

interface ProfileCardProps {
  name?: string;
  username?: string;
  bio?: string;
  following?: number;
  followers?: string;
  location?: string;
  website?: string;
  initials?: string;
}

export default function UserCard({
  name = "As a Programmer",
  username = "asaprogrammerr",
  bio = "Software Engineer · Building things with Next.js & TypeScript",
  following = 128,
  followers = "4.2k",
  location = "Turkey",
  website = "youtube.com/asaprogrammerr",
  initials = "AP",
}: ProfileCardProps) {
  return (
    <div className=" w-8/10 rounded-2xl h-100 sticky top-25    left-80 dark:border-white/10 dark:bg-neutral-900   bg-white border border-gray-100 overflow-hidden shadow-sm">
      
      {/* Cover */}
      <div className="h-24 bg-gradient-to-br from-blue-500/20 to-blue-600/10 dark:from-blue-500/10 dark:to-transparent " />

      {/* Body */}
      <div className="px-5 pb-5">

        {/* Avatar */}
        <div className="-mt-7 mb-3">
          <div className="w-14 h-14 rounded-full bg-sky-500 dark:border-slate-900 flex items-center justify-center border-[3px] border-white">
            <span className="text-white text-sm font-semibold tracking-wide">
              {initials}
            </span>
          </div>
        </div>

        {/* Name & handle */}
        <h2 className="text-zinc-950 dark:text-zinc-100 text-base font-bold leading-tight">
          {name}
        </h2>
        <p className="text-zinc-400 dark:text-zinc-600 text-xs font-mono mt-0.5 mb-2">
          @{username}
        </p>

        {/* Bio */}
        <p className="text-zinc-500 dm-sans dark:text-zinc-400 text-sm leading-relaxed mb-4">
          {bio}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 0 gap-px bg-zinc-200 dark:bg-zinc-700 rounded-xl overflow-hidden mb-4">
          <div className="bg-zinc-50 dark:bg-zinc-800  py-2.5 text-center">
            <p className="text-zinc-950 dark:text-white dm-sans text-lg font-bold">{following}</p>
            <p className="text-zinc-400 text-[10px] font-semibold tracking-widest uppercase mt-0.5">
              Following
            </p>
          </div>
          <div className="bg-zinc-50 dark:bg-zinc-800 py-2.5 text-center">
            <p className="text-zinc-950 dark:text-white dm-sans text-lg font-bold">{followers}</p>
            <p className="text-zinc-400 text-[10px] font-semibold tracking-widest uppercase mt-0.5">
              Followers
            </p>
          </div>
        </div>

        {/* Meta */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-zinc-500 text-xs">
            <MapPin size={13} className="text-zinc-400 shrink-0" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <Link2 size={13} className="text-zinc-400 shrink-0" />
            <a
              href={`https://${website}`}
              target="_blank"
              rel="noreferrer"
              className="text-sky-500 hover:underline truncate"
            />
              {website}

          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Calendar size={13} /> <span> Joined January 2022 </span>
                  </div>
        </div>

      </div>
    </div>
  );
}