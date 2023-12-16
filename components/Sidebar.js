import Image from "next/image"
import SidebarMenuItem from "./SidebarMenuItem"
import {HomeIcon} from "@heroicons/react/solid"
import {LightBulbIcon, BellIcon, InboxIcon, UserIcon, CogIcon} from "@heroicons/react/outline"

export default function Sidebar() {
  return (
    <div className="hidden-sm:flex flex-col p-3 xl:items-start fixed h-full">
        {/*Logo*/}
        <div className="hoverEffect p-0 hover:bg-blue-100 xl:px-1">
            <Image width="75" height="75" src="https://thumbs.dreamstime.com/z/print-171223965.jpg"></Image>
        </div>     

        {/*Menu*/}
        <div className="mt-4 mb-2.5 xl:items-start">
        <SidebarMenuItem text="Home" Icon={HomeIcon} active/>
        <SidebarMenuItem text=" Discover" Icon={LightBulbIcon}/>
        <SidebarMenuItem text="Notifications" Icon={BellIcon}/>
        <SidebarMenuItem text="Inbox" Icon={InboxIcon}/>
        <SidebarMenuItem text="Projects" Icon={CogIcon}/>
        <SidebarMenuItem text="Profile" Icon={UserIcon} alt="user-img"/>
        </div>


        {/*Button*/}
        <button className="leading-5 bg-blue-400 text-white rounded-full w-56 h-20 shadow-md hover:brightness-95 text-lg hidden xl:inline">Post</button>


        {/*Profile*/}
        <div className="">


        </div>

    </div>
  )
}
