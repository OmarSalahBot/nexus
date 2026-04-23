"use client";

import { useState } from "react";
import {
  MapPin,
  Link2,
  Calendar,
  Moon,
  Sun,
  Heart,
  MessageCircle,
  Repeat2,
  Bookmark,
  MoreHorizontal,
  ArrowLeft,
  BadgeCheck,
} from "lucide-react";

// ─── Static Data ───────────────────────────────────────────────────────────────

const user = {
  name: "Ahmed P.",
  username: "@asaprogrammerr",
  initials: "AP",
  bio: "Software Engineer · Building things with Next.js & TypeScript",
  location: "Turkey",
  website: "youtube.com/asaprogrammerr",
  joined: "January 2022",
  following: 500,
  followers: 4200,
};

const posts = [
  {
    id: 1,
    content:
      "Who is learning Next.js in 2025 with me? ✨ The App Router just changed everything about how I think about full-stack.",
    tags: ["#NextJS", "#WebDev"],
    time: "17h ago",
    likes: 2400,
    comments: 184,
    reposts: 312,
    image: true,
  },
  {
    id: 2,
    content:
      "TypeScript generics are actually not that scary once you see the pattern. Here's a simple trick that changed everything for me 🧵",
    tags: ["#TypeScript", "#Dev"],
    time: "2d ago",
    likes: 1800,
    comments: 97,
    reposts: 210,
    image: false,
  },
  {
    id: 3,
    content:
      "Shipped a new open source tool today! It handles server actions in Next.js with full type-safety. Check it out 🚀",
    tags: ["#OpenSource", "#NextJS"],
    time: "5d ago",
    likes: 3100,
    comments: 240,
    reposts: 520,
    image: false,
  },
];

const tabs = ["Posts", "Likes"];

// ─── Helpers ───────────────────────────────────────────────────────────────────

const fmt = (n: number) =>
  n >= 1000 ? (n / 1000).toFixed(1).replace(".0", "") + "k" : String(n);

// ─── Post Card ─────────────────────────────────────────────────────────────────

function ProfilePostCard({ post }: { post: (typeof posts)[0] }) {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [likes, setLikes] = useState(post.likes);

  return (
    <div className="p-5 border-b border-gray-100 dark:border-white/10  transition-colors">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center shrink-0">
            <span className="text-white text-xs font-bold">{user.initials}</span>
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="font-semibold text-sm text-gray-900 dark:text-white">{user.name}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <span>{user.username}</span>
              <span>·</span>
              <span>{post.time}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed mb-3">
        {post.content}{" "}
        {post.tags.map((t) => (
          <span key={t} className="text-blue-500 cursor-pointer hover:underline">{t} </span>
        ))}
      </p>

      {/* Image placeholder */}
      {post.image && (
        <div className="rounded-xl bg-gray-100 dark:bg-white/5 w-full h-40 flex items-center justify-center mb-3 border border-gray-200 dark:border-white/10">
          <p className="text-gray-400 dark:text-gray-600 text-xs tracking-widest select-none">desk · code · laptop</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-4">
          <button
            onClick={() => { setLiked((p) => !p); setLikes((p) => liked ? p - 1 : p + 1); }}
            className="flex items-center gap-1.5 group"
          >
            <Heart size={16} className={liked ? "fill-red-500 text-red-500" : "text-gray-400 group-hover:text-red-400"} />
            <span className={`text-xs font-medium ${liked ? "text-red-500" : "text-gray-500 group-hover:text-red-400"}`}>{fmt(likes)}</span>
          </button>
          <button className="flex items-center gap-1.5 group">
            <MessageCircle size={16} className="text-gray-400 group-hover:text-blue-400 transition-colors" />
            <span className="text-xs font-medium text-gray-500 group-hover:text-blue-400 transition-colors">{post.comments}</span>
          </button>
        </div>

      </div>
    </div>
  );
}

// ─── Profile Page ──────────────────────────────────────────────────────────────

export default function ProfilePage() {
  const [dark, setDark] = useState(false);
  const [activeTab, setActiveTab] = useState("Posts");
  const [following, setFollowing] = useState(false);

  return (

      <div className="min-h-screen pt-25 bg-gray-100 dark:bg-[#0f0f0f] transition-colors duration-300">

        {/* ── Layout ── */}
        <div className="max-w-7xl mx-auto px-4  flex gap-5">

          {/* ── Left: Profile Card ── */}
          <aside className="w-3/10 shrink-0">
            <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm overflow-hidden sticky top-20">
              {/* Cover */}
              <div className="h-24 bg-gradient-to-br from-blue-500/20 to-blue-600/10 dark:from-blue-500/10 dark:to-transparent" />

              {/* Avatar + follow */}
              <div className="px-5 pb-5">
                <div className="flex items-end justify-between -mt-8 mb-4">
                  <div className="w-16 h-16 rounded-full bg-blue-500 border-4 border-white dark:border-[#1a1a1a] flex items-center justify-center">
                    <span className="text-white font-bold text-lg">{user.initials}</span>
                  </div>
                  <button
                    onClick={() => setFollowing((f) => !f)}
                    className={`px-2 py-2 mt-10 ml-10 w-27 flex justify-center  hover:bg-sky-500 hover:text-white rounded-full  text-sm font-medium border transition-all duration-200 ${
                      following
                        ? "bg-blue-500 text-white border-blue-500 hover:bg-blue-600"
                        : "border-gray-300 dark:border-white/20 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/10"
                    }`}
                  >
                    {following ? "Following" : "Follow"}
                  </button>
                </div>

                {/* Name */}
                <div className="mb-3">
                  <div className="flex items-center gap-1 mb-0.5">
                    <h2 className="font-bold text-gray-900 dark:text-white text-base">{user.name}</h2>
                  </div>
                  <p className="text-xs text-gray-400 font-mono">{user.username}</p>
                </div>

                {/* Bio */}
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">{user.bio}</p>

                {/* Meta */}
                <div className="space-y-1.5 mb-4">
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <MapPin size={13} /> <span>{user.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-blue-500">
                    <Link2 size={13} /> <span className="hover:underline cursor-pointer">{user.website}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Calendar size={13} /> <span>Joined {user.joined}</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex justify-center gap-4 pt-4 border-t border-gray-100 dark:border-white/10">
                  <div className="text-center">
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{fmt(user.following)}</p>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">Following</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{fmt(user.followers)}</p>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">Followers</p>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* ── Right: Posts ── */}
          <main className="flex-1 min-w-0 w-1/2">
            <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm overflow-hidden">

              {/* Tabs */}
              <div className="flex border-b border-gray-100 dark:border-white/10">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-3.5 text-sm font-medium transition-colors relative ${
                      activeTab === tab
                        ? "text-blue-500"
                        : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    }`}
                  >
                    {tab}
                    {activeTab === tab && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-blue-500 rounded-full" />
                    )}
                  </button>
                ))}
              </div>

              {/* Post list */}
              {activeTab === "Posts" ? (
                posts.map((post) => <ProfilePostCard key={post.id} post={post} />)
              ) : (
                <div className="py-16 text-center text-gray-400 dark:text-gray-600 text-sm">
                  No {activeTab.toLowerCase()} yet
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
  );
}