import { SparklesIcon } from "@heroicons/react/outline"
import { useRecoilState } from "recoil"
import { useEffect, useState } from 'react';
import {postsState} from "../atom/modalAtom"
import Input from '../components/Input'
import Post from '../components/Post'
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { useSession } from "next-auth/react";
import { useData } from './DataContext';

export default function Qfeed() {
  //const posts = useData();
  const [p, setP]=useRecoilState(postsState);   
  const [posts, setPosts]=useState([]);   
  const { data: session } = useSession();

{/*


  useEffect(() => {
    // Only run this effect if there is a session and thus a logged-in user
    if (session?.user?.uid) {
      // Set up the Firestore query for the posts collection, ordered by timestamp
      const postsQuery = query(collection(db, "posts"), orderBy("timestamp", "desc"));
  
      // Establish the real-time subscription
      const unsubscribe = onSnapshot(postsQuery, (snapshot) => {
        // Directly store the array of document snapshots if the user is logged in
        setPosts(snapshot.docs.filter(doc => doc.data().id === session.user.uid));
      });
  
      // Return the unsubscribe function for cleanup
      return () => unsubscribe();
    } else {
      // If there's no session, set the posts state to an empty array
      setPosts([]);
    }
  }, [session]);*/}

  
  








  
  useEffect(() =>onSnapshot(

    
        query(collection(db, "posts"), orderBy("timestamp", "desc")),
        (snapshot) => {
          //setPosts([{ id: 'test'}]);
          setPosts(snapshot.docs);

        }
      ),
    []
      )

      useEffect(() => {
        const userPosts = posts.filter(post => post?.data()?.id === session?.user?.uid)
        const formattedData = userPosts.map(Proj => ({
          title: Proj?.data()?.projectTitle,
          description: Proj?.data()?.projectDescription,
          projectEndDate: Proj?.data()?.projectEndDate,
          // You can format the date or include other fields as needed
        }));
        console.log("Formatted_data",formattedData)
        setP(formattedData);
      }, [posts, session]); // This effect runs whenever the posts data changes
  
  //console.log("posts", p)

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
