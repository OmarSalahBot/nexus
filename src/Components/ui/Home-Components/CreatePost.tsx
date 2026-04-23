"use client";
import { useState, useRef } from "react";
import { Image, Clock, Smile, Send } from "lucide-react";

interface CreatePostProps {
  username?: string;
  initials?: string;
}

export default function CreatePost({
  username = "Ahmed P.",
  initials = "AP",
}: CreatePostProps) {
  const [text, setText] = useState("");
  const [focused, setFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handlePost = () => {
    if (!text.trim()) return;
    alert(`Posted: ${text}`);
    setText("");
  };

  const handleContainerClick = () => {
    textareaRef.current?.focus();
  };

  return (
    <div className="bg-white dm-sans rounded-2xl dark:border-zinc-800 dark:bg-neutral-900 shadow-sm border border-gray-100 p-4 w-full max-w-2xl mx-auto">
      {/* Top Row */}
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center shrink-0 select-none">
          <span className="text-white text-sm font-semibold">{initials}</span>
        </div>

        {/* Input */}
        <div
          className={`flex-1 rounded-xl dark:bg-zinc-800 dark:border-zinc-700 dark:border border px-4 py-2 cursor-text transition-all duration-200`}
          onClick={handleContainerClick}
        >
          <textarea
            ref={textareaRef}
            rows={1}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="What's on your mind?"
            className="w-full bg-transparent dark:text-zinc-100 dark:bg-zinc-800 flex items-center text-gray-700 placeholder-gray-400 dark:placeholder-zinc-600 text-medium resize-none outline-none leading-relaxed"
            style={{ minHeight: "45px", maxHeight: "120px" }}
            onInput={(e) => {
              const el = e.currentTarget;
              el.style.height = "auto";
              el.style.height = `${el.scrollHeight}px`;
            }}
          />
        </div>
      </div>

      {/* Divider */}
      <div className="border-t dark:border-zinc-800 border-gray-100 mt-3 mb-2" />

      {/* Bottom Row */}
      <div className="flex items-center justify-between">
        {/* Action Buttons */}
        <div className="flex items-center gap-1">
          <ActionButton icon={<Image size={16} />} label="Photo" />
        </div>

        {/* Post Button */}
        <button
          onClick={handlePost}
          disabled={!text.trim()}
          className={`flex items-center gap-1.5 px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
            text.trim()
              ? "bg-blue-500 hover:bg-blue-600 active:scale-95 text-white shadow-sm"
              : "bg-blue-300 text-white cursor-not-allowed"
          }`}
        >
          Post
        </button>
      </div>
    </div>
  );
}

function ActionButton({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-blue-400 text-sm font-medium hover:bg-blue-50 active:scale-95 transition-all duration-150">
      {icon}
      <span>{label}</span>
    </button>
  );
}