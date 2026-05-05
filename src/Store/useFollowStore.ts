import { create } from "zustand";
import { api }  from "../lib/axios";



interface FollowState {
  usersListToFollow: any; 
  makingOrRemovingFollow:any;
  whoToFollow: () => Promise<void>;
  makeRemoveFollow: (id:any) => Promise<void>;
}

export const useFollowStore = create<FollowState>(( set , get ) =>({

        usersListToFollow:null,
        makingOrRemovingFollow:false,


        whoToFollow: async() => {
            set({ makingOrRemovingFollow : true})
            try{
                const res = await api.get('/follow/who-to-follow');
                set({ usersListToFollow: res.data });
            }catch(err){
                console.error("error fetching: ",err);
            }finally{
                set({ makingOrRemovingFollow : false})
            }
        },
        makeRemoveFollow: async (id)=> {
            try{
                const res = await api.post(`/follow/make-remove-follow/${id}`);
            }catch(err){
                console.error("error fetching: ",err);
            }
        }
    
}));

