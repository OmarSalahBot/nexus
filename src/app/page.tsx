'use client'
import React, { useEffect } from 'react'
import UserCard from '@/Components/ui/UserCard'
import CreatePost from '@/Components/ui/Home-Components/CreatePost';
import PostCard from '@/Components/ui/Home-Components/PostCard';
import WhoToFollow from '@/Components/ui/Home-Components/WhoToFollow';
import RecentActivity from '@/Components/ui/Home-Components/RecentActivity';
import GuestUserCard from '@/Components/ui/Home-Components/GuestCard';
import { useAuthStore } from '@/Store/useAuthStore';
import { usePostStore } from "@/Store/usePostStore";
import { useFollowStore } from "@/Store/useFollowStore";
import { useRouter } from 'next/navigation';


function page() {
  const { user , setOpenNotifications , checkAuth , notifications } = useAuthStore();

    const {  usersListToFollow } = useFollowStore();
      const router = useRouter();
  

    
    const { getAllPosts  , posts } = usePostStore();


  useEffect(()=>{
    if(!user){
      router.replace('/login');
    }
      if(user){
      getAllPosts();
      }
    }, [getAllPosts , user]);


  return (
    <div className=' dark:bg-[#0f0f0f]  flex pb-10 min-h-screen relative gap-4 justify-center pt-25 '
    onClick={() => setOpenNotifications(false)} >
      {/* Logged User Info */}
      <div className=" w-1/4 ">
        {user? <UserCard/> : null }
      </div>
        <div className="w-2/5">
          {/* Logged User Info */}
            {user ? <CreatePost /> :null}
          {/* Posts */}
          <div className=" rounded-4xl border  mt-3 dark:border-white/10 bg-white dark:bg-neutral-900 ">

            {posts?.map((post:any, idx:any) => (
              <PostCard key={idx} id={post?._id} fullname={post?.userId.fullname} image={ post?.image } idx={idx} username={post?.userId.username} 
              text={post?.text} likes={post?.likes.length} 
              date={post?.createdAt} color={post?.userId.themeColor} profilePic={post?.userId.profilePic} isLiked={post?.isLiked}   />
            ))}
          </div>

        </div>
        <div className=" justify-center w-1/4 ">
        { usersListToFollow?.length == 3 ? (
          <div className="bg-white rounded-2xl dark:border-zinc-800 dark:bg-neutral-900 border sticky top-25 right-85 border-gray-100 shadow-sm p-5 w-full max-w-sm mx-auto">
          <h2 className="text-lg font-bold text-gray-900 dm-sans mb-4 dark:text-zinc-100 ">Who to Follow</h2>
              <div className="flex flex-col divide-y  divide-gray-200">
                  {usersListToFollow?.map((user:any) => (
                    <WhoToFollow key={user._id} user={user}/>
                  ))}
            </div>
        </div>
        ) : null }
          { notifications?.length == 0 ? null : <RecentActivity/> }
      </div>
      </div>
  )
}

export default page