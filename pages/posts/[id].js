import Head from 'next/head'
import Image from "next/image"
import {HomeIcon} from "@heroicons/react/solid"
import {LightBulbIcon, BellIcon, InboxIcon, UserIcon, CogIcon} from "@heroicons/react/outline"
import { DotsHorizontalIcon,ChatIcon,TrashIcon,HeartIcon,ShareIcon,ChartBarIcon } from "@heroicons/react/outline"
import Moment from 'react-moment';
import FeedbackModal from '../../components/FeedbackModal'



import Sidebar from '../../components/Sidebar'
import SidebarMenuItem from "../../components/SidebarMenuItem"

import Widgets from '../../components/Widgets'
import Post from '../../components/Post'
//import CommentModal from '../../components/CommentModal'
import {ArrowLeftIcon } from "@heroicons/react/outline"
import { useRouter } from 'next/router'
import { onSnapshot, doc } from 'firebase/firestore'
import {useState, useEffect} from "react"
import {db} from "../../firebase"

import { useRecoilState } from "recoil";
import {modalState_email} from "../../atom/modalAtom" 





export default function feed_post() {
  const router=useRouter()
  const {id} = router.query
  const [post, setPost]=useState(null)
  const [open, setOpen]=useRecoilState(modalState_email)

  //useEffect(()=>onSnapshot(doc(db, "posts", id), (snapshot)=>setPost(snapshot)),[db, id])
  console.log("the id is",{id} )
  //const readableEndDate = new Date(post?.data().projectEndDate).toLocaleDateString('en-US', {
  //  month: 'long',
  //  day: 'numeric',
  //  year: 'numeric',
  //});
  useEffect(
    () => onSnapshot(doc(db, "posts", id), (snapshot) => setPost(snapshot)),
    [db, id]
  );
  console.log("the post data is",post?.data() )
  const readableEndDate = new Date(post?.data()?.projectEndDate).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div>
      <Head>
        <title>Post Page</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen max-w-7xl mx-auto">
        
      {/*Sidebar*/}
      <div className="hidden-sm:flex flex-col xl:items-start fixed h-full">
        {/*Logo*/}
        <div className="hoverEffect p-0 hover:bg-blue-100 xl:px-1">
            <Image width="75" height="75" src="https://thumbs.dreamstime.com/z/print-171223965.jpg"></Image>
        </div>     

        {/*Menu*/}
        <div className="mt-4 mb-2.5 xl:items-start">
        <SidebarMenuItem text="Home" Icon={HomeIcon} active/>
        <SidebarMenuItem text="Projects" Icon={CogIcon}/>
        {/*{session &&(
        <>
        <SidebarMenuItem text="Notifications" Icon={BellIcon}/>
        <SidebarMenuItem text="Inbox" Icon={InboxIcon}/>
        <SidebarMenuItem text=" Discover" Icon={LightBulbIcon}/>
        <SidebarMenuItem text="Profile" Icon={UserIcon} alt="user-img"/>
        </>
        )}*/}
        </div>
        {/*Post Button  onClick={()=>handleAddProject()}*/}
        
        <button  className="leading-5 bg-blue-400 text-white rounded-full w-56 h-20 shadow-md hover:brightness-95 text-lg hidden xl:inline">Edit</button>
        
        {/*U need to add an ampty fragment in react for session, or return only one div*/}


        {/*Profile*/}
        <div className="">


        </div>

    </div>
      
      

      <div className="xl:ml-[300px] border-l border-r border-gray-200 xl:min-w-[650px] sm:ml-[100px] flex-grow max-w-xl">
       <div className="flex items-center space-x-2 py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200">
      <div classname="hoverEffect">
        <ArrowLeftIcon onClick={()=>router.push("/")} className="h-5" />
      </div>
        <h2 className="text-lg sm:text-xl font-bold cursor-pointer">Post</h2>
        
        
       </div>     

       {/****************/}

  <div className="flex p-3 cursor-pointer border-b border-gray-200">
        {/*image*/}
        <img className="h-11 w-11 rounded-full cursor-pointer mr-4" src={post?.data()?.userImg} alt="user-img"/>

        <div className="flex-1">
            {/*Header*/}
            <div className="flex item-center justify-between">
                {/*post user info*/}
                <div className="flex space-x-1 items-center whitespace-nowrap">
                    <h4 className="font-bold text-[15px] sm-text-[16px] hover:underline">{post?.data()?.name}</h4>
                    <span className="text-sm sm-text-[15px] hover:underline"><Moment fromNow>{post?.data()?.timestamp?.toDate()}</Moment></span>
                </div>
             
            </div>
            {/*post Project Title*/}
            {/*<p className="text-gray-800 text-[15px] sm:text-[16px] mb-2 ">{post.data().projectTitle}</p>*/}
            <p className="text-gray-800  text-xl font-bold mb-2 ">{post?.data()?.projectTitle}</p>
            {/*post Project Description*/}
            <p className="text-gray-800 text-[15px] sm:text-[16px] mb-2 ">{post?.data()?.projectDescription}</p>
            {/*End Date*/}
            <p className="text-gray-800 text-[15px] sm:text-[16px] mb-2 ">
            <span className="font-bold">Timeline:</span> {readableEndDate}
            </p>
            <button onClick={()=>{
                    
                    setOpen(!open)
                    //setpostId(post.id)
} }className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-20 disabled:opacity-50" >Request Feedback</button>

        </div>
</div>  







  {/****************/}
      
    </div>
    {



    console.log("the post data of the world is",post?.data()?.id )



    }


  {/****************/}




  {/****************/}


      {/*Widgets*/}
      <Widgets/>

      {/*Modal*/}
      <FeedbackModal/>
     


      </main>


    </div>
  )
}
