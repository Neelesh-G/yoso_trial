import { Snapshot, useRecoilState } from "recoil"
import {modalState, postIdState} from "../atom/modalAtom" 
import Modal from "react-modal"
import {XIcon, PhotographIcon, EmojiHappyIcon} from "@heroicons/react/outline"
import { useEffect, useState } from "react"
import {db} from "../firebase"
import Moment from 'react-moment'
import {doc, onSnapshot,collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"


export default function CommentModal() {
  const [open, setOpen]=useRecoilState(modalState)
  const [postId]=useRecoilState(postIdState)
  const [post, setPost]=useState({})
  const [input, setInput]=useState("")         
  const {data:session}=useSession()
  const router=useRouter()

  useEffect(() => {
    onSnapshot(doc(db, "posts", postId), (snapshot) => {
      setPost(snapshot);
    });
  }, [postId, db]); 
  async function sendComment(){
    await addDoc(collection(db, "posts", postId, "comments"), {
      comment:input,
      name:session.user.name,
      username:session.user.username,
      userImg:session.user.image,
      timestamp:serverTimestamp()



    })
    setOpen(false)
    setInput("")
    router.push(`posts/${postId}`)


  } 
    return <div>
      {open && (
        <Modal isOpen={open}
        onRequestClose={()=>setOpen(false)}
        className="max-w-lg w-[90%]  absolute top-24 left-[25%] transalte-x-[-40%] 
        bg-white border-2 border-gray-100 rounded-xl shadow-md ">
          <div className="p-1">
            <div className="border-b border-gray-200">
              <div onClick={()=>setOpen(false)} className="hoverEffect w-9 h-9 flex items-center justify-center">
                <XIcon className="h-[22px] text-gray-700"></XIcon>
              </div>
            </div>
            <div className="p-2 flex items-center space-x-1 relative">
            <img className="h-11 w-11 rounded-full cursor-pointer mr-4" src={post?.data()?.userImg} alt="user-img"/>
            <h4 className="font-bold text-[15px] sm-text-[16px] hover:underline">{post?.data()?.name}</h4>
            </div>
            <p className="text-gray-500 text-[15px] sm:text-[16px] ml-16 mb-2">{post?.data()?.text}</p>
            
    <div className="flex border-b border-gray-200 p-3 space-x-3">
        <img src={session.user.image} alt="user-img"
        className="h-11 w-11 rounded-full cursor-pointer hover:brightness-70" />
        <div className="w-full divide-y divide-gray-200">
            <div className="">
              <textarea className="w-full border-none focus:ring-0 text-lg tracking-wide min-h-[50px] text-gray-700" rows="2" 
              placeholder="" 
              value={input}
              onChange={(e)=>setInput(e.target.value)}
              ></textarea>
            </div>
            <div className="flex items-center justify-between pt-2.5">
              
                {/*images and document icon*/}
                <div className="flex">
                      <div className="" onClick={()=>filePickerRef.current.click()}>
                          <PhotographIcon className="h-10 w-10 hoverEffect p-2 text-sky-700 hover:bg-sky-50"/>
                          {/*<input type="file" hidden ref={filePickerRef} onChange={addImageToPost}/>*/}
                      </div>
                      <EmojiHappyIcon className="h-10 w-10 hoverEffect p-2 text-sky-700 hover:bg-sky-50"/>
                </div>
                   
                  <button onClick={sendComment}  disabled={!input.trim()} className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-20 disabled:opacity-50" >Reply</button>
                
            </div>
        </div>
    </div>
   


            </div>


        </Modal>
      )
      }

    </div>
}