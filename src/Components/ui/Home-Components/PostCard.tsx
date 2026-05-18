"use client";

import { useAuthStore } from "@/Store/useAuthStore";
import { formatRelativeTime } from "@/lib/formatDate";
import { useEffect, useState } from "react";
import { Heart, MessageCircle, Send } from "lucide-react";
import { usePostStore } from "@/Store/usePostStore";
import Link from 'next/link';


interface Comment {
  id: number;
  fullname: string;
  username: string;
  text: string;
  color: string;
  date: string;
}

interface PostProps {
  id:any;
  fullname: string;
  username: string;
  date: any;
  text: string;
  image?: string;
  idx: number;
  likes: number;
  color: string;
  isLiked:boolean;
  profilePic:any;
}

const colorsMap: Record<string, string> = {
  emerald: "#10b981",
  blue:    "#3b82f6",
  purple:  "#a855f7",
  orange:  "#f97316",
  teal:    "#14b8a6",
};

export default function PostCard({ id , fullname, username, text, image, likes, idx, date, color , isLiked , profilePic }: PostProps) {
  const [liked, setLiked] = useState(isLiked);
  const [likesCounter , setLikesCounter ] = useState(likes)
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [ comments , setComments] = useState<any>("");
  const { user } = useAuthStore();
  const { addOrRemoveLike , getAllPostComments , addComment } = usePostStore();

  const userBg = colorsMap[color] || "#3b82f6";
  const currentUserBg = colorsMap[user?.themeColor] || "#3b82f6";


  useEffect(() => {
  const fetchComments = async () => {
    try {
      // لازم تستخدم await هنا عشان تاخد البيانات اللي جوه الـ Promise
      const data = await getAllPostComments(id); 
      setComments(data); 
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  fetchComments();
}, []);

  const handleAddComment = () => {
    if (!commentText.trim()) return;
    const addingNewComment = async ()=>{
      try{
        const newComment = await addComment(id , {
          text:commentText
        });
        setComments((prev :any) => [...prev, newComment]);
      }catch(err){
        console.log(err);
      }
    }
    addingNewComment();
    setCommentText("");
  };


  const handleLike = (id : any) =>{
    setLiked(!liked);
    if(liked){
      setLikesCounter((v)=> v - 1);
    }else{
      setLikesCounter((v)=> v + 1);
    }


  addOrRemoveLike(id);

  }

  return (
    <div className={`${idx !== 0 ? "border-t" : ""} border-gray-100 dark:border-white/10 p-4`}>

      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-12 h-12 rounded-full select-none flex items-center justify-center shrink-0" style={{ backgroundColor: userBg }}>
          {profilePic ? 
            (
              <img src={profilePic} alt="avatar" className="w-full h-full rounded-full object-cover" />
            ) :
            (
              <span className="text-white text-sm font-semibold tracking-wide">
              {fullname?.slice(0,2)}
              </span>
            ) 
          }
        </div>
        <div>
          <Link href={`/profile/${username}`} className="font-semibold hover:underline text-sm text-gray-900 dark:text-zinc-100">{fullname}</Link>
          <p className="text-xs text-gray-400">@{username} · {formatRelativeTime(date)}</p>
        </div>
      </div>

      {/* Text */}
      <p className="text-sm text-gray-700 font-medium dark:text-zinc-200 leading-relaxed mb-3">{text}</p>

      

      {/* Image */}
      {image && <img src={image} alt="Post" className="rounded-xl mb-3 max-h-96 w-full object-cover" />}

      {/* Actions */}
      <div className="flex items-center gap-5 mt-5 mb-3">
        <button onClick={() => handleLike(id)} className="flex items-center gap-1.5 group">
          <Heart size={17} className={liked ? "fill-red-500 text-red-500" : "text-gray-400 group-hover:text-red-400 transition-colors"} />
          <span className={`text-xs font-medium ${liked ? "text-red-500" : "text-gray-400 group-hover:text-red-400 transition-colors"}`}>
            {new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(likesCounter)}
          </span>
        </button>

        <button onClick={() => setShowComments((v) => !v)} className="flex items-center gap-1.5 group">
          <MessageCircle size={17} className={`transition-colors ${showComments ? "text-blue-500" : "text-gray-400 group-hover:text-blue-400"}`} />
          <span className={`text-xs font-medium transition-colors ${showComments ? "text-blue-500" : "text-gray-400 group-hover:text-blue-400"}`}>
            {comments.length}
          </span>
        </button>
      </div>

      {/* ── Inline Comments ── */}
      {showComments && (
        <div className=" pt-5 space-y-2.5 border-t border-gray-100 mt-5 dark:border-white/10 pt-3">

          {/* Input */}
          <div className="flex  gap-2 mb-8 bg-gray-100/60 dark:bg-white/[0.04] border border-gray-200 dark:border-white/10 rounded-xl px-3 py-3 focus-within:border-blue-500 transition-colors">
            <div className="w-10 h-10 rounded-full flex select-none items-center justify-center shrink-0" style={{ backgroundColor: currentUserBg }}>
              <span className="text-white text-sm font-bold">{(user?.fullname || "Y").slice(0, 2)}</span>
            </div>
            <div className="flex-1 flex items-center gap-2 bg-gray-50 dark:bg-white/[0.04] border border-gray-200 dark:border-white/10 rounded-xl px-3 py-1.5 focus-within:border-blue-500 transition-colors">
              <input
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
                placeholder="Add a comment…"
                className="flex-1 bg-transparent text-sm h-6 text-gray-800 dark:text-zinc-200 placeholder-gray-400 outline-none"
              />
              {commentText.trim() && (
                <button onClick={handleAddComment} className="text-blue-500 hover:text-blue-400 transition-colors">
                  <Send size={13} />
                </button>
              )}
            </div>
          </div>


          {/* Comment list */}
          {comments.map((c:any) => {
            const bg = colorsMap[c.color] || "#3b82f6";
            return (
              <div key={c.id} className="flex items-start mb-5 gap-2">
                {/* thin vertical line connector */}
                <div className="flex flex-col items-center pt-1" >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center select-none shrink-0" style={{ backgroundColor: colorsMap[c.userId?.themeColor] }} >
                    {c.userId?.profilePic ? 
            (
              <img src={c.userId?.profilePic} alt="avatar" className="w-full h-full rounded-full object-cover" />
            ) :
            (
              <span className="text-white text-sm font-semibold tracking-wide">
              {c.userId?.fullname?.slice(0,2)}
              </span>
            ) 
          }
                  </div>
                </div>
                <div className=" rounded-xl px-3 py-2">
                  <div className="flex  gap-5 mb-0.5">
                    <span className="text-xs font-semibold  text-gray-900 dark:text-zinc-100">{c.userId.fullname}</span>
                    <span className="text-xs font-light text-gray-400">@{c.userId.username}</span>
                    <span className="text-xs text-gray-400">{formatRelativeTime(c.createdAt)}</span>
                  </div>
                  <p className="text-sm font-normal   text-gray-700  dark:text-zinc-200   leading-relaxed">{c.text}</p>
                </div>
              </div>
            );
          })}


        </div>
      )}
    </div>
  );
}