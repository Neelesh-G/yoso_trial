import {PhotographIcon, EmojiHappyIcon} from "@heroicons/react/outline"
  export default function Input() {
  return (
    <div className="flex border-b border-gray-200 p-3 space-x-3">
        <img src="https://t3.ftcdn.net/jpg/02/99/04/20/360_F_299042079_vGBD7wIlSeNl7vOevWHiL93G4koMM967.jpg" alt="user-img"
        className="h-11 w-11 rounded-full cursor-pointer hover:brightness-70" />
        <div className="w-full divide-y divide-gray-200">
            <div className="">
              <textarea className="w-full border-none focus:ring-0 text-lg tracking-wide min-h-[50px] text-gray-700" rows="2" placeholder="Ask Your Query"></textarea>
            </div>
            <div className="flex items-center justify-between pt-2.5">
                {/*images and document icon*/}
                  <div className="flex">
                      <PhotographIcon className="h-10 w-10 hoverEffect p-2 text-sky-700 hover:bg-sky-50"/>
                      <EmojiHappyIcon className="h-10 w-10 hoverEffect p-2 text-sky-700 hover:bg-sky-50"/>
                  </div>
                  <button className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-20 disabled:opacity-50" >Ask</button>
            </div>
        </div>
    </div>
  )
}