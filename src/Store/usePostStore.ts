import { create } from "zustand";
import { api }  from "../lib/axios";


interface PostsState {
  posts: any; 
  userProfilePosts:any;
  userProfile:any;
  isGettingPosts: boolean;
  getAllPosts: () => Promise<void>;
  getAllPostComments: (id:any) => Promise<any>;
  createPost: (data:any)=>Promise<void>;
  addOrRemoveLike:(id:any) => void;
  deletePost:(id:any) => void;
  addComment:(id:any , data:any) => any;
  getUserPosts:(username:any) => void;

}

export const usePostStore = create<PostsState>((set , get)=>({
    posts:null,
    isGettingPosts: true,
    userProfilePosts:null,
    userProfile:null,

    getAllPosts: async()=>{
        set({ isGettingPosts: true })
        try{
            const res = await api.get('/post/all-posts');
            set({ posts: res.data, isGettingPosts: false });
        } catch (error) {
            console.error('Error fetching posts:', error)
            set({ isGettingPosts: false })
        }
    },

    createPost: async (data)=>{
        const {posts} = get();
        try{
            const res = await api.post('/post/create-post',data)
            set({ posts: [res.data , ...posts] });
            console.log(posts)
        }catch(err){
            console.error('Error creating post:', err);
        }
    },
    addOrRemoveLike: async (id)=>{
        try{
            const res = await api.post(`/post/like/${id}`);
        }catch(err){
            console.error('Error',err)
        }
    },
    getAllPostComments: async(id)=>{
        try{
            const res = await api.get(`/post/get-comments/${id}`);
            return res.data;

        }catch(err){
            console.error('Error',err)
        }
    }
    ,
    addComment: async(id , data) =>{
        try{
            const res = await api.post(`/post/add-comment/${id}`, data);
            return res.data;
        }catch(err){
            console.error("error",err);
        }
    },
    getUserPosts: async(username)=>{
        set({ isGettingPosts: true });
        try{
            const res = await api.get(`/post/user-posts/${username}`);
            set({ userProfilePosts: res.data.posts, isGettingPosts: false });
            set({ userProfile: res.data.profileOwner })
        } catch (error) {
            console.error('Error fetching posts:', error);
            set({ isGettingPosts: false });
        }
    }, deletePost: async( id ) =>{
        try {
            const res = await api.delete(`/post/delete-post/${id}`);
            const currentPosts = get().userProfilePosts;

            const updatedPosts = currentPosts.filter((e : any)=> e._id.toString() !== id.toString()) ;
            set({  userProfilePosts : updatedPosts });
        } catch(err) {
            console.log(err);
        }
    }

}));