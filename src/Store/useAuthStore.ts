import { create } from "zustand";
import { api }  from "../lib/axios";




interface AuthState {
    user: any; 
    isCheckingAuth: boolean;
    message:string;
    isGettingUserData:boolean;
    isGettingNotifications: boolean;
    checkAuth: () => Promise<void>;
    login: ( data : any) => Promise<void>;
    signup: ( data : any) => Promise<void>;
    openNotifications: boolean;
    getAllNotifications: () => Promise<void>;
    setOpenNotifications: (v: boolean) => void;
    notifications:any;
    markAllAsRead:()=>void;
    logout:()=>void;
    editProfile:(data:any)=> void;
}


export const useAuthStore = create<AuthState>((set , get)=>({
    
    user:null,
    notifications:null,
    isGettingNotifications: true ,
    message:"",
    isGettingUserData:false,
    openNotifications: false,
    isCheckingAuth: true,

    setOpenNotifications : (v : boolean) => set({openNotifications: v}),

    checkAuth : async()=> {
        try {
            const res = await api.get("/auth/check");
            set({ user : res.data })
        }catch(err){
            set({ user : null });
        }finally{
            set({ isCheckingAuth: false });
            console.log(get().user)
        }
    },

    login : async( data )=> {
        try{
            const res = await api.post('/auth/login', data);
            set({ user : res.data })
        }catch(err){
            set({ user: null });
        }
    },
    signup: async( data )=>{
        try{
            const res = await api.post('/auth/register', data);
            set({ user : res.data })

        }catch(err){
            set({ user: null });
        }
    }, 

    logout: async ()=> {
        try{
            const res = await api.post('/auth/logout');
            set({ user:null })
        }catch(err){
            
        }
    },

    getAllNotifications : async ()=> {
        try{
            const res = await api.get('/notifications/get-notifications');
            set({ notifications : res.data , isGettingNotifications: false })
        }catch(err:any){
            set({ notifications : null, isGettingNotifications: false })
        }
    },
    
    markAllAsRead: () => {
    set((state) => ({
      notifications: state.notifications.map((n:any) => ({ ...n, read: true })),
    }));
  },

  editProfile : async(data) => {
    set({ isGettingUserData: true })
    try{
        const res = await api.put('/auth/edit-profile',data);
        set({ user : res.data , message:"Profile edited successfully"})
    }catch(err:any){
        set({ message: err.response?.data?.message || "Something went wrong" });
    }finally {
        set({ isGettingUserData: false });
    }
  }


}));

