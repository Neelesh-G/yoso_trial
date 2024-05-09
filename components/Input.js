import {PhotographIcon, EmojiHappyIcon, XIcon} from "@heroicons/react/outline"
import { useSession, signOut } from "next-auth/react"
import { useRef, useState } from "react"
import {addDoc, collection, serverTimestamp, doc, updateDoc} from "firebase/firestore"
import {db, storage} from "../firebase"
import { uploadString, ref, getDownloadURL } from "firebase/storage"


   export default function Input() {
    const {data:session}=useSession()
    const [input, setInput]=useState("")
    const filePickerRef=useRef(null) 
    const [selectedFile, setSelectedFile]=useState(null)
    const [loading, setLoading]=useState(false)

    {/*doc ref, to reference a particular document, addDoc() to add document to a collection called posts in the database after pressing ask button */}
    {/*info being added to the firebase*/}
    const sendPost=async()=>{
      if(loading) return;
      setLoading(true)
      const docRef=await addDoc(collection(db,"posts"),{
      id:session.user.uid,
      text:input,
      userImg:session.user.image, 
      timestamp:serverTimestamp(),    
      name:session.user.name,
      username:session.user.name,
    })

    const imageRef=ref(storage, `posts/${docRef.id}/image`);
    if(selectedFile){
      await uploadString(imageRef,selectedFile, "data_url").then(async()=>{
      const downloadURL=await getDownloadURL(imageRef)
      await updateDoc(doc(db,"posts", docRef.id), {
        image:downloadURL,
      })
      
    })
    }
    setInput("")
    setSelectedFile(null)
    setLoading(false)
    }

    const addImageToPost=(temp)=>{
        const reader=new FileReader()
        if(temp.target.files[0]){
          reader.readAsDataURL(temp.target.files[0])
        }
        reader.onload=(readerEvent)=>{
          setSelectedFile(readerEvent.target.result)
        }
    }
    
   
    
    
  console.log(session)
  return (
    <>
    {session && (
    <div className="flex border-b border-gray-200 p-3 space-x-3">
        <img onClick={signOut} src={session.user.image} alt="user-img"
        className="h-11 w-11 rounded-full cursor-pointer hover:brightness-70" />
        <div className="w-full divide-y divide-gray-200">
            <div className="">
              <textarea className="w-full border-none focus:ring-0 text-lg tracking-wide min-h-[50px] text-gray-700" rows="2" 
              placeholder="Congratulate your peers" 
              value={input}
              onChange={(e)=>setInput(e.target.value)}
              ></textarea>
            </div>
            {selectedFile&&(
              <div className="relative">
                <XIcon onClick={()=>setSelectedFile(null)} className="h-7 text-black absolute cursor-pointer shadow-md shadow-white rounded-full"></XIcon>
                <img  src={selectedFile} className={`${loading && "animate-pulse"}`}/>
              </div>
            )}
            <div className="flex items-center justify-between pt-2.5">
              {!loading&&(
                <> 
                {/*images and document icon*/}
                <div className="flex">
                      <div className="" onClick={()=>filePickerRef.current.click()}>
                          <PhotographIcon className="h-10 w-10 hoverEffect p-2 text-sky-700 hover:bg-sky-50"/>
                          <input type="file" hidden ref={filePickerRef} onChange={addImageToPost}/>
                      </div>
                      
                  </div>
                  <button onClick={sendPost}  disabled={!input.trim()} className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-20 disabled:opacity-50" >Add</button>
                 </>
              )}
                
            </div>
        </div>
    </div>
    )}
    </>
  )
  }