import { Snapshot, useRecoilState } from "recoil"
import {modalState_email, postIdState} from "../atom/modalAtom" 
import Modal from "react-modal"
import {XIcon, PhotographIcon, EmojiHappyIcon} from "@heroicons/react/outline"
import { useEffect, useState } from "react"
import {db} from "../firebase"
import Moment from 'react-moment'
import {doc, onSnapshot,collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"


export default function FeedbackModal() {
  const [open, setOpen]=useRecoilState(modalState_email)
  //const [postId]=useRecoilState(postIdState)
  //const [post, setPost]=useState({})
  const [input, setInput]=useState("")         
  const {data:session}=useSession()
 // const router=useRouter()

 
  async function sendEmail(e){
   e.preventDefault()
   
  const data="helo"
   fetch('/api/mail', {
   method:'post',
   body:JSON.stringify(data)
   })
   
    setOpen(false)
    setInput("")
    


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
           
            </div>
            
    <div className="flex border-b border-gray-200 p-3 space-x-3">
        
        <div className="w-full divide-y divide-gray-200">
            <div className="">
              <textarea className="w-full border-none focus:ring-0 text-lg tracking-wide min-h-[50px] text-gray-700" rows="2" 
              placeholder="Enter Email" 
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
                   
                  <button onClick={sendEmail}  disabled={!input.trim()} className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-20 disabled:opacity-50" >Send</button>
                
            </div>
        </div>
    </div>
   


            </div>


        </Modal>
      )
      }

    </div>
}