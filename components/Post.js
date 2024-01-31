import { DotsHorizontalIcon,ChatIcon,TrashIcon,HeartIcon,ShareIcon,ChartBarIcon } from "@heroicons/react/outline"
import {HeartIcon as HeartIconFilled } from "@heroicons/react/outline"
import Moment from 'react-moment';
import {doc, onSnapshot, setDoc, collection, deleteDoc } from "firebase/firestore";
import {db, storage} from "../firebase"
import { signIn, useSession} from "next-auth/react"
import {useState, useEffect} from "react"
import { deleteObject } from "firebase/storage";
export default function Post({post}) {
    const {data:session}=useSession()
    const [likes, setLikes]=useState([])
    const [hasLiked, setHasLiked]=useState(false)
    useEffect(()=>{
        const unsubscribe=onSnapshot(
            collection(db, "posts", post.id, "likes"), (snapshot)=>setLikes(snapshot.docs)
        )
    },[db])

    useEffect(()=>{
        setHasLiked(likes.findIndex((like) => like.id === session?.user.uid) !== -1);
    }, [likes])
    async function likepost(){
        if(session){
            if(hasLiked){
                await deleteDoc(doc(db, "posts", post.id, "likes", session?.user.uid))
    
            }
            else{
                await setDoc(doc(db, "posts", post.id, "likes", session?.user.uid), {
                username:session.user.username})
            }
        }
        else{
            signIn()
        }
        
    
    }
    async function deletePost(){
        deleteDoc(doc(db, "posts", post.id))
        if(post.data().image){
        deleteObject(doc(storage, `posts/${post.id}/image`))
        }
    }
  return (
    <div className="flex p-3 cursor-pointer border-b border-gray-200">
        {/*image*/}
        <img className="h-11 w-11 rounded-full cursor-pointer mr-4" src={post.data().userImg} alt="user-img"/>
        {/*right side*/}
        <div className="">
            {/*Header*/}
            <div className="flex item-center justify-between">
                {/*post user info*/}
                <div className="flex space-x-1 items-center whitespace-nowrap">
                    <h4 className="font-bold text-[15px] sm-text-[16px] hover:underline">{post.data().name}</h4>
                    {/*<span className="text-sm sm-text-[15px]">@{post.username} - </span>*/}
                    <span className="text-sm sm-text-[15px] hover:underline"><Moment fromNow>{post?.data().timestamp?.toDate()}</Moment></span>
                </div>
                {/*dot icon*/}
                <DotsHorizontalIcon className="h-10 w-10 hoverEffect hover:bg-sky-100 hover:text-sky-500 p-2"/>
            </div>
            {/*post text*/}
            <p className="text-gray-800 text-[15px] sm:text-[16px] mb-2 ">{post.data().text}</p>
            {/*post image*/}
            <img className="rounded-2xl mr-2" src={post.data().image} alt=""/>
            {/*icons*/}
            <div className="flex justify-between text-gray-500 p-2">
                <ChatIcon className="h-5 w-5 hover:text-sky-700 hover:bg-sky-100 hover:rounded-full"/>
                {session?.user.uid===post?.data().id&&(
                    <TrashIcon onClick={deletePost} className="h-5 w-5 hover:text-red-700 hover:bg-red-100 hover:rounded-full"/>
                )}
            <div className="flex items-center">
                {hasLiked?(
                    <HeartIconFilled onClick={likepost} className="h-5 w-5 text-sky-700 hover:bg-sky-100 hover:rounded-full"/>
                    ):(
                    <HeartIcon onClick={likepost} className="h-5 w-5 hover:text-sky-700 hover:bg-sky-100 hover:rounded-full"/>
                    )}
                    {likes.length>0&&<span className={`${hasLiked &&"text-blue-600 text-sm"}`}>{likes.length}</span>}


            </div>
                

                <ShareIcon className="h-5 w-5 hover:text-sky-700 hover:bg-sky-100 hover:rounded-full"/>
                <ChartBarIcon className="h-5 w-5 hover:text-sky-700 hover:bg-sky-100 hover:rounded-full"/>
            </div>

        </div>
    </div>
  )
}
