"use client";

import React, { useEffect , ReactNode } from 'react';
import { useAuthStore } from '@/Store/useAuthStore';
import { useFollowStore } from "@/Store/useFollowStore";
import LoadingScreen from "@/Components/LoadingScreen";

interface AuthProviderProps {
  children: ReactNode;
}

function AuthProvider( { children }: AuthProviderProps ) {
    const { checkAuth , isCheckingAuth } = useAuthStore();
    const { whoToFollow } = useFollowStore();

    useEffect(()=>{
        checkAuth();
        whoToFollow();
    },[]);

    if(isCheckingAuth) return <LoadingScreen />;

  return (
    <div>{children}</div>
  )
}

export default AuthProvider;