import React, { createContext, useState, useEffect, useContext } from 'react';
import { collection, query, orderBy, onSnapshot, where } from 'firebase/firestore';
import { db } from '../firebase'; // Adjust the path as necessary
import { useSession } from 'next-auth/react';
import { useRecoilState } from "recoil"

import {postsState} from "../atom/modalAtom"



export default function DataContext() {
    const [p, setP]=useRecoilState(postsState);   
  const [posts, setPosts]=useState([]);   
  const { data: session } = useSession();
  useEffect(() =>onSnapshot(

    
    query(collection(db, "posts"), orderBy("timestamp", "desc")),
    (snapshot) => {
      //setPosts([{ id: 'test'}]);
      setP(snapshot.docs);

    }
  ),
[]
  )

  return (
    <div>





    </div>
  )
}
