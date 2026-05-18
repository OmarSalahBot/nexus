"use client";

import React, { useEffect , ReactNode } from 'react';
import { useAuthStore } from '@/Store/useAuthStore';
import { useFollowStore } from "@/Store/useFollowStore";
import LoadingScreen from "@/Components/LoadingScreen";
import { useRouter , usePathname } from 'next/navigation';

interface AuthProviderProps {
  children: ReactNode;
}

function AuthProvider( { children }: AuthProviderProps ) {
    const { checkAuth , isCheckingAuth , user} = useAuthStore();
    const { whoToFollow } = useFollowStore();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(()=>{
        checkAuth();
        whoToFollow();
    },[]);

    useEffect(()=>{
      if(user){
        router.push('/')
      }else{
        router.push('/login')
      }
    },[user])

    if(isCheckingAuth) return <LoadingScreen />;

  return (
    <div>{children}</div>
  )
}

export default AuthProvider;