"use client";

import { useState } from "react";
import { Heart, MessageCircle, Repeat2, Bookmark, MoreHorizontal, BadgeCheck } from "lucide-react";
import Image from "next/image";

export default function PostCard() {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [likes, setLikes] = useState(2400);

  const handleLike = () => {
    setLiked((prev) => !prev);
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
  };

  const formatCount = (n: number) => {
    if (n >= 1000) return (n / 1000).toFixed(1).replace(".0", "") + "k";
    return n.toString();
  };

  return (
    <div className="  duration-300 dark:border-white/10   border-b border-gray-100  p-4 max-w-2xl  mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="w-11 h-11 rounded-full bg-blue-500 flex items-center justify-center shrink-0 select-none">
            <span className="text-white text-sm font-bold">BO</span>
          </div>

          {/* User Info */}
          <div>
            <div className="flex items-center gap-1">
              <span className="font-semibold text-gray-900 text-sm dark:text-zinc-100 ">Burak Orkmez</span>
            
            </div>
            <div className="flex items-center gap-1 text-gray-400 text-xs">
              <span>@burakorkmezz</span>
              <span>·</span>
              <span>17h ago</span>
            </div>
          </div>
        </div>
        
      </div>

      {/* Post Text */}
      <p className="text-gray-600  dark:text-zinc-200  text-sm leading-relaxed font-medium mb-3">
        Who is learning Next.js in 2025 with me? ✨ The App Router just changed everything about how I think about full-stack.{" "}
        <span className="text-blue-500 cursor-pointer hover:underline">#NextJS</span>{" "}
        <span className="text-blue-500 cursor-pointer hover:underline">#WebDev</span>
      </p>

      {/* Image Placeholder */}
      <div className="rounded-xl bg-gray-100 dark:bg-gray-900 w-full h-70 flex items-center justify-center mb-3">
        <p className="text-gray-400 text-sm tracking-widest select-none">desk · code · laptop</p>
      </div>

      
      {/* Actions */}
      <div className="flex items-center justify-between py-2">
        <div className="flex items-center gap-4">
          {/* Like */}
          <button
            onClick={handleLike}
            className="flex items-center gap-1.5 group transition-all"
          >
            <Heart
              size={18}
              className={`transition-colors ${
                liked ? "fill-red-500 text-red-500" : "text-gray-400 group-hover:text-red-400"
              }`}
            />
            <span
              className={`text-sm font-medium transition-colors ${
                liked ? "text-red-500" : "text-gray-500 group-hover:text-red-400"
              }`}
            >
              {formatCount(likes)}
            </span>
          </button>

          {/* Comment */}
          <button className="flex items-center gap-1.5 group transition-all">
            <MessageCircle
              size={18}
              className="text-gray-400 group-hover:text-blue-400 transition-colors"
            />
            <span className="text-sm font-medium text-gray-500 group-hover:text-blue-400 transition-colors">
              184
            </span>
          </button>
        </div>

      </div>
    </div>
  );
}