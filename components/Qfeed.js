import { SparklesIcon } from "@heroicons/react/outline"
import { useEffect, useState } from 'react';
import Input from '../components/Input'
import Post from '../components/Post'
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

export default function Qfeed() {
  const [posts, setPosts]=useState([])
  useEffect(() =>onSnapshot(
        query(collection(db, "posts"), orderBy("timestamp", "desc")),
        (snapshot) => {
          setPosts(snapshot.docs);
        }
      ),
    []
  );
  return (
    <div className="xl:ml-[300px] border-l border-r border-gray-200 xl:min-w-[650px] sm:ml-[100px] flex-grow max-w-xl">
       <div className="flex py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200">

        <h2 className="text-lg sm:text-xl font-bold cursor-pointer">Home</h2>
        <div className="hoverEffect flex items-center justify-center px-0 ml-auto ">
        <SparklesIcon className="h-5"/>
        </div>
        
       </div>     

       <Input/>
       {
       posts.map((post)=>(
        <Post key={post.id} post={post} />
       ))

      }
    </div>
  )
}
