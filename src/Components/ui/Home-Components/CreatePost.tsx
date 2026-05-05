"use client";
import { useState, useRef } from "react";
import { Image, Clock, Smile, Send , X } from "lucide-react";
import { usePostStore } from "@/Store/usePostStore";
import { useAuthStore } from "@/Store/useAuthStore";
import { colorsMap } from "@/lib/colorsMap";



export default function CreatePost() {
  const [text, setText] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [focused, setFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const { createPost } = usePostStore();
  const { user } = useAuthStore();
  const userBg = colorsMap[user?.themeColor] || "#3b82f6";

  const handleContainerClick = () => {
    textareaRef.current?.focus();
  };

const handUploadImage = (e: any) => {
  const file = e.target.files[0];
  if (!file) return;
  if (!file.type.startsWith("image/")) return;

  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onloadend = () => {
    // 1. تأكد إن النتيجة string باستخدام Type Casting
    const base64Image = reader.result as string;
    
    // 2. خزنها في الـ State
    setImage(base64Image);
  };
};

    const handleSend = () => {
    if (!text.trim() && !image) return;

    createPost({
      text: text.trim() ,
      image: image,
    })


    setText("");
    setImage(null);
  };

  return (
    <div className="bg-white dm-sans rounded-2xl dark:border-zinc-800 dark:bg-neutral-900 shadow-sm border border-gray-100 p-4 w-full  mx-auto">
      {/* Top Row */}
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="w-10  select-none h-10 rounded-full  flex items-center justify-center shrink-0 select-none" style={{ backgroundColor: userBg }} >
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

        {/* Input */}
        <div
          className={`flex-1 rounded-xl  dark:bg-zinc-800 dark:border-zinc-700 dark:border border px-4 py-2 cursor-text transition-all duration-200
            ${focused ? "ring-2 ring-blue-500 border-transparent" : "border-gray-200"}`}
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
            className="w-full bg-transparent  dark:text-zinc-100 dark:bg-zinc-800 flex items-center text-gray-700 placeholder-gray-400 dark:placeholder-zinc-600 text-medium resize-none outline-none leading-relaxed"
            style={{ minHeight: "45px", maxHeight: "120px" }}
            onInput={(e) => {
              const el = e.currentTarget;
              el.style.height = "auto";
              el.style.height = `${el.scrollHeight}px`;
            }}
          />
        </div>
      </div>

      {/* Image Preview */}
          {image && (
            <div className="relative mt-3 mb-3 rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10">
              <img
                src={image}
                alt="preview"
                className="w-full max-h-72 object-cover"
              />
              {/* Gradient overlay at top for button visibility */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent pointer-events-none rounded-2xl" />
              {/* Remove button */}
              <button
                onClick={() => setImage(null)}
                className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white backdrop-blur-sm transition-colors"
              >
                <X size={13} />
              </button>
            </div>
          )}
 

      {/* Divider */}
      <div className="border-t dark:border-zinc-800 dark border-gray-100 mt-3 mb-2" />

      {/* Bottom Row */}
      <div className="flex items-center justify-between">
        {/* Action Buttons */}
        <div className="flex items-center gap-1">
          <button className="flex hover:dark:text-sky-400 hover:dark:bg-sky-900/30 items-center gap-1.5 px-3 py-1.5 rounded-lg text-blue-400 text-sm font-medium hover:bg-blue-50 active:scale-95 transition-all duration-150"
          onClick={() => imageInputRef.current?.click()} >
      
          <Image size={16} />
          <span>Photo</span>
          <input type="file" accept='image/*' className="hidden" ref={imageInputRef}  onChange={handUploadImage}/>
      </button>
        </div>

        {/* Post Button */}
        <button
          onClick={handleSend}
          disabled={!text && !image}
          className={`flex items-center gap-1.5 px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
            (text || image)
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

