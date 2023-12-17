import { DotsHorizontalIcon,ChatIcon,TrashIcon,HeartIcon,ShareIcon,ChartBarIcon } from "@heroicons/react/outline"
export default function Post({post}) {
  return (
    <div className="flex p-3 cursor-pointer border-b border-gray-200">
        {/*image*/}
        <img className="h-11 w-11 rounded-full cursor-pointer mr-4" src={post.userImg} alt="user-img"/>
        {/*right side*/}
        <div className="">
            {/*Header*/}
            <div className="flex item-center justify-between">
                {/*post user info*/}
                <div className="flex space-x-1 items-center whitespace-nowrap">
                    <h4 className="font-bold text-[15px] sm-text-[16px] hover:underline">{post.name}</h4>
                    {/*<span className="text-sm sm-text-[15px]">@{post.username} - </span>*/}
                    <span className="text-sm sm-text-[15px] hover:underline">{post.timestamp}</span>
                </div>
                {/*dot icon*/}
                <DotsHorizontalIcon className="h-10 w-10 hoverEffect hover:bg-sky-100 hover:text-sky-500 p-2"/>
            </div>
            {/*post text*/}
            <p className="text-gray-800 text-[15px] sm:text-[16px] mb-2 ">{post.text}</p>
            {/*post image*/}
            <img className="rounded-2xl mr-2" src={post.img} alt=""/>
            {/*icons*/}
            <div className="flex justify-between text-gray-500 p-2">
                <ChatIcon className="h-5 w-5 hover:text-sky-700 hover:bg-sky-100 hover:rounded-full"/>
                <TrashIcon className="h-5 w-5 hover:text-red-700 hover:bg-red-100 hover:rounded-full"/>
                <HeartIcon className="h-5 w-5 hover:text-sky-700 hover:bg-sky-100 hover:rounded-full"/>
                <ShareIcon className="h-5 w-5 hover:text-sky-700 hover:bg-sky-100 hover:rounded-full"/>
                <ChartBarIcon className="h-5 w-5 hover:text-sky-700 hover:bg-sky-100 hover:rounded-full"/>
            </div>

        </div>
    </div>
  )
}
