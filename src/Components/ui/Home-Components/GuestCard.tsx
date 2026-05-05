"use client";

import Link from "next/link";
import { LogIn, UserPlus, Sparkles } from "lucide-react";

export default function GuestUserCard() {
  return (
    <div className="bg-white dark:bg-[#1a1a1a] sticky top-25  left-180 w-7/10 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm overflow-hidden">

      {/* Cover gradient */}
      <div className="h-20 bg-gradient-to-br from-blue-500/20 to-blue-700/10 dark:from-blue-500/10 dark:to-transparent" />

      <div className="px-5 pb-5">
        {/* Ghost avatar */}
        <div className="-mt-8 mb-4">
          <div className="w-16 h-16 rounded-full border-4 border-white dark:border-[#1a1a1a] bg-gray-200 dark:bg-white/10 flex items-center justify-center">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-400 dark:text-gray-600">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
        </div>

        {/* Text */}
        <div className="mb-4">
          <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1">You're not signed in</h3>
          <p className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed">
            Sign in to post, follow people, and see your personalized feed.
          </p>
        </div>

        {/* Features list */}
        <div className="space-y-2 mb-5">
          {[
            "Post and share your thoughts",
            "Follow people you love",
            "Get a personalized feed",
          ].map((f) => (
            <div key={f} className="flex items-center gap-2">
              <Sparkles size={12} className="text-blue-500 shrink-0" />
              <span className="text-xs text-gray-500 dark:text-gray-400">{f}</span>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="space-y-2">
          <Link
            href="/signup"
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold transition-colors active:scale-[.98]"
          >
            <UserPlus size={15} /> Create Account
          </Link>
          <Link
            href="/login"
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-gray-200 dark:border-white/10 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
          >
            <LogIn size={15} /> Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}