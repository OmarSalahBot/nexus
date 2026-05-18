"use client";

import { useState, useRef, useEffect } from "react";
import { Camera, MapPin, Link2, Calendar, Check, X, Loader2 } from "lucide-react";
import { useAuthStore } from "@/Store/useAuthStore";

import { colorsMap } from '@/lib/colorsMap';

export default function EditProfilePage() {
  const [saving, setSaving] = useState(false);
  const { user , isGettingUserData , editProfile , message   } = useAuthStore();
  const [ image , setImage ] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const [ form , setForm ] = useState({
    fullname:user?.fullname,
    username:user?.username,
    bio:user?.bio,
    location:user?.location,
  })

  const userBg = colorsMap[user?.themeColor] || "#3b82f6";



  const handUploadImage = (e: any) => {
  const file = e.target.files[0];
  if (!file) return;
  if (!file.type.startsWith("image/")) return;

  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onloadend = () => {
    const base64Image = reader.result as string;
    setImage(base64Image); // بنخزن الصورة الجديدة هنا
  };
};


  const handleChange = async(e:any) => {
    setForm((prev)=> ({...prev , [e.target.name]: e.target.value }))
  }

  const handleSave = async () => {
    editProfile({
      fullname:form.fullname,
      username:form.username,
      bio:form.bio,
      location:form.location,
      profilePic:image
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-25 dark:bg-[#0f0f0f] py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-4">

        {/* ── Main Card ── */}
        <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm overflow-hidden">

          {/* Cover */}
          <div
            className="h-36 relative group"
            onClick={() => coverInputRef.current?.click()}
            style={coverPreview ? { backgroundImage: `url(${coverPreview})`, backgroundSize: "cover", backgroundPosition: "center" } : {}}
          >
            
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20  to-blue-700/10 dark:from-blue-500/10 dark:to-transparent" />
         
            
          </div>
          <div className="px-6 pb-6">
            {/* Avatar */}
            <div className="relative -mt-10 mb-4 w-fit">
              <div
                className="w-20 h-20 rounded-full border-4 border-white dark:border-[#1a1a1a] cursor-pointer group relative overflow-hidden"
                onClick={() => avatarInputRef.current?.click()}
              >
                {user?.profilePic
                  ? <img src={user?.profilePic} alt="avatar" className="w-full h-full object-cover" />
                  : <div className="w-full h-full bg-blue-500 flex items-center justify-center" style={{ backgroundColor : userBg }} ><span className="text-white font-bold text-xl">{user?.fullname?.slice(0,2)}</span></div>
                }
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
                  <Camera size={16} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
              <input ref={avatarInputRef}  type="file" accept="image/*" className="hidden" onChange={(e) => handUploadImage(e)} />
            </div>

            <div className="flex items-center justify-between mb-5">
              <h1 className="text-base font-bold text-gray-900 dark:text-white">Edit Profile</h1>
            </div>

            <div className="space-y-4">

              {/* Name + Username */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Display Name</label>
                  <input
                    name="fullname"
                    value={form.fullname}
                    onChange={(e) => handleChange(e)}
                    placeholder="Your name"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-sm text-gray-900 dark:text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Username</label>
                  <div className="flex items-center rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all">
                    <span className="pl-4 text-sm text-gray-400 shrink-0">@</span>
                    <input
                      name='username'
                      value={form.username}
                      onChange={(e) => handleChange(e)}
                      placeholder="username"
                      className="flex-1 pl-1 pr-4 py-2.5 bg-transparent text-sm text-gray-900 dark:text-white placeholder-gray-400 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Bio</label>
                <div className="relative">
                  <textarea
                    name="bio"
                    value={form.bio}
                    onChange={(e) => handleChange(e)}
                    maxLength={160}
                    rows={3}
                    placeholder="Tell people about yourself…"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-sm text-gray-900 dark:text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  />
                  <span className="absolute right-3 bottom-2.5 text-xs text-gray-300 dark:text-gray-600">{form.bio.length}/160</span>
                </div>
              </div>

              {/* Location + Website */}
              <div className="grid gap-4">
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">
                    <MapPin size={12} /> Location
                  </label>
                  <input
                    name='location'
                    value={form.location}
                    onChange={(e) => handleChange(e)}
                    placeholder="City, Country"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-sm text-gray-900 dark:text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                
              </div>

              {/* Joined (read-only) */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">
                  <Calendar size={12} /> Joined
                </label>
                <div className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-sm text-gray-400 select-none">
                  January 2022
                </div>
              </div>
                <p className="flex justify-center text-s text-blue-500" > { message } </p>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button className="px-5 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors flex items-center gap-2">
                Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={isGettingUserData}
                  className={`px-6 py-2.5 rounded-xl text-sm font-semibold text-white flex items-center gap-2 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed active:scale-[.98] ${saved ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"}`}
                >
                  {isGettingUserData ? <><Loader2 size={14} className="animate-spin" /> Saving…</>
                    : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}