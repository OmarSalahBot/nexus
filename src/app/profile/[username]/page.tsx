"use client";

import PostCard from "@/Components/ui/Home-Components/PostCard";
import { usePostStore } from "@/Store/usePostStore";

import { useEffect, useState } from "react";
import { useParams } from 'next/navigation';
import { colorsMap } from "@/lib/colorsMap";

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
import { useAuthStore } from "@/Store/useAuthStore";
import { useFollowStore } from "@/Store/useFollowStore";
import LoadingScreen from "@/Components/LoadingScreen";



// ─── Profile Page ──────────────────────────────────────────────────────────────

export default function ProfilePage() {
        const params = useParams();
    const { getUserPosts , userProfilePosts , userProfile , isGettingPosts } = usePostStore();
    const { user } = useAuthStore();
  const [dark, setDark] = useState(false);
  const [activeTab, setActiveTab] = useState("Posts");
  const [following, setFollowing] = useState(false);
  const { makeRemoveFollow , makingOrRemovingFollow } = useFollowStore();

  


  useEffect(()=>{
    getUserPosts(params.username);
  },[]);

  useEffect(() => {
  if (userProfile?.profileOwner) {
    setFollowing(userProfile?.isFollowed);
  }
}, [userProfile]);


  
  const date = new Date(userProfile?.profileOwner.createdAt);
  const formattedDate = date.toLocaleDateString('en-US', {
  month: 'long',   
  year: 'numeric'  
  });


  const handleFollow = () => { 
    setFollowing((f) => !f);
    makeRemoveFollow(userProfile?.profileOwner._id);
  }

  if(isGettingPosts) return <LoadingScreen/>;

  return (

      <div className="min-h-screen pt-25 bg-gray-100 dark:bg-[#0f0f0f] transition-colors duration-300">

        {/* ── Layout ── */}
        <div className="max-w-7xl mx-auto px-4  flex gap-5">

          {/* ── Left: Profile Card ── */}
          <aside className="w-3/10 shrink-0">
            <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm overflow-hidden sticky top-25">
              {/* Cover */}
              <div className="h-24 bg-gradient-to-br from-blue-500/20 to-blue-600/10 dark:from-blue-500/10 dark:to-transparent" />

              {/* Avatar + follow */}
              <div className="px-5 pb-5">
                <div className="flex items-end justify-between -mt-8 mb-4">
                  <div className="w-16 h-16 rounded-full border-4 border-white dark:border-[#1a1a1a] flex items-center justify-center" 
                  style={{ backgroundColor: colorsMap[userProfile?.profileOwner.themeColor] }}>
                    {userProfile?.profileOwner.profilePic ? 
            (
              <img src={userProfile?.profileOwner.profilePic} alt="avatar" className="w-full h-full rounded-full object-cover" />
            ) :
            (
              <span className="text-white text-sm font-semibold tracking-wide">
              {userProfile?.profileOwner.fullname?.slice(0,2)}
              </span>
            ) 
          }
                  </div>
                  <button
                    onClick={handleFollow}
                    disabled={makingOrRemovingFollow}
                    className={`px-2 py-2 mt-10  ml-10 w-27 ${ userProfile?.profileOwner._id?.toString() == user?._id.toString() ? "hidden" : null } flex justify-center  hover:bg-sky-500 hover:text-white rounded-full  text-sm font-medium border transition-all duration-200 ${
                      following
                        ? "bg-blue-500 text-white border-blue-500 hover:bg-blue-600"
                        : "border-gray-300 dark:border-white/20 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/10"
                    }  ${
                      makingOrRemovingFollow ?" opacity-35 " :null
                    }`}
                  >
                    {following ? "Following" : "Follow"}
                  </button>
                </div>

                {/* Name */}
                <div className="mb-3">
                  <div className="flex items-center gap-1 mb-0.5">
                    <h2 className="font-bold text-gray-900 dark:text-white text-base">{userProfile?.profileOwner.fullname}</h2>
                  </div>
                  <p className="text-xs text-gray-400 font-mono">@{userProfile?.profileOwner.username}</p>
                </div>

                {/* Bio */}
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  {userProfile?.profileOwner.bio ? userProfile.profileOwner.bio : "Hey there! I'm using Nexus."}
                  </p>

                {/* Meta */}
                <div className="space-y-1.5 mb-4">
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <MapPin size={13} /> <span>{userProfile?.profileOwner.location || 'No Location'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Calendar size={13} /> <span>Joined {formattedDate}</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex justify-center gap-4 pt-4 border-t border-gray-100 dark:border-white/10">
                  <div className="text-center">
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{new Intl.NumberFormat('en-US', {
                                                                                          notation: 'compact',
                                                                                          compactDisplay: 'short',
                                                                                          maximumFractionDigits: 1
                                                                                        }).format(userProfile?.profileOwner.followingCount)}</p>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">Following</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{new Intl.NumberFormat('en-US', {
                                                                                          notation: 'compact',
                                                                                          compactDisplay: 'short',
                                                                                          maximumFractionDigits: 1
                                                                                        }).format(userProfile?.profileOwner.followersCount)}</p>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">Followers</p>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* ── Right: Posts ── */}
          <main className="flex-1 min-w-0 w-1/2 mb-5">
            <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm overflow-hidden">

              

              {/* Post list */}
              {userProfilePosts?.length > 0 ?
              userProfilePosts?.map((post:any, idx:any) => (
                            <PostCard key={idx} id={post?._id} fullname={post?.userId.fullname} image={ post?.image } idx={idx} username={post?.userId.username} 
                            text={post?.text} likes={post?.likes.length} 
                            date={post?.createdAt} color={post?.userId.themeColor} isLiked={post?.isLiked} profilePic={post?.userId.profilePic}   />
                          )) : <div className="text-gray-600 dark:text-gray-400 h-100 flex justify-center text-2xl font-normal items-center"> This user Has No Posts </div>  
            }
            </div>
          </main>
        </div>
      </div>
  );
}