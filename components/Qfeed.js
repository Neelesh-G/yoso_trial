import { SparklesIcon } from "@heroicons/react/outline"
import Input from '../components/Input'
import Post from '../components/Post'

export default function Qfeed() {
  const posts=[
    {
      id:"1",
      name:"Neelesh",
      username:"gopalak4",
      userImg:"https://t3.ftcdn.net/jpg/02/99/04/20/360_F_299042079_vGBD7wIlSeNl7vOevWHiL93G4koMM967.jpg",
      img:"https://assets.postman.com/postman-docs/code-snippet-copy-icon.jpg",
      text:"Solve this",
      timestamp:"1 hour ago"

    },
    {
      id:"2",
      name:"Neelesh",
      username:"gopalak4",
      userImg:"https://t3.ftcdn.net/jpg/02/99/04/20/360_F_299042079_vGBD7wIlSeNl7vOevWHiL93G4koMM967.jpg",
      img:"https://assets.postman.com/postman-docs/code-snippet-copy-icon.jpg",
      text:"Solve this again",
      timestamp:"1 hour ago"

    }

  ]
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
