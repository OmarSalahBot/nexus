import React from 'react'
import UserCard from '@/Components/ui/UserCard'
import CreatePost from '@/Components/ui/Home-Components/CreatePost';
import PostCard from '@/Components/ui/Home-Components/PostCard';
import WhoToFollow from '@/Components/ui/Home-Components/WhoToFollow';
import RecentActivity from '@/Components/ui/Home-Components/RecentActivity';

function page() {
  return (
    <div className=' dark:bg-[#0f0f0f]  flex pb-10 min-h-full relative gap-4 justify-center pt-25 '>
      {/* Logged User Info */}
      <div className=" justify-center w-fit ">
        <UserCard name="Ahmed" following={500} />
      </div>
        <div className="">
          {/* Logged User Info */}
            <CreatePost initials="AP" username="Ahmed P." />
          {/* Posts */}
            <div className=" rounded-4xl border  mt-3 dark:border-white/10 bg-white dark:bg-neutral-900 ">
              <PostCard />
              <PostCard />
              <PostCard />
            </div>
        </div>
        <div className=" justify-center w-fit ">
          <WhoToFollow />
          <RecentActivity/>
      </div>
      </div>
  )
}

export default page