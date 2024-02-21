import Image from "next/image"
import SidebarMenuItem from "./SidebarMenuItem"
import {HomeIcon} from "@heroicons/react/solid"
import {LightBulbIcon, BellIcon, InboxIcon, UserIcon, CogIcon} from "@heroicons/react/outline"
import { useSession, signIn } from "next-auth/react"
import { useRouter } from "next/router"

export default function Sidebar() {
  const {data:session}=useSession();
  const router=useRouter()
  const handleAddProject = () => {
    router.push(`posts/Project`); // Assuming '/add-project' is your form page route
  };
  return (
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
        {/*Post Button */}
        {session?(
        <button onClick={()=>handleAddProject()} className="leading-5 bg-blue-400 text-white rounded-full w-56 h-20 shadow-md hover:brightness-95 text-lg hidden xl:inline">Add Project</button>):(
        <button onClick={signIn} className="leading-5 bg-blue-400 text-white rounded-full w-56 h-20 shadow-md hover:brightness-95 text-lg hidden xl:inline">Sign In</button>
        ) }
        {/*U need to add an ampty fragment in react for session, or return only one div*/}


        {/*Profile*/}
        <div className="">


        </div>

    </div>
  )
}
