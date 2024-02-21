// SpreadsheetComponent.js
import { useRecoilValue } from 'recoil';
import { postsState } from '../../atom/modalAtom';
import { TrashIcon } from '@heroicons/react/solid';
import {modalState, postIdState} from "../../atom/modalAtom"
import { useRouter } from "next/router"
import {useRecoilState } from "recoil"

import Sidebar from '../../components/Sidebar'
import React, { useEffect, useState, useRef  } from 'react';
import { AgGridReact } from 'ag-grid-react';
import {doc, collection, query, orderBy, onSnapshot, where, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase'; 


import { useSession } from 'next-auth/react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';


export default function ProjectList() {
  const [p, setP] = useState([]);
 
 // const p = useRecoilValue(postsState);
  //console.log("row_data", p);
  
  const gridRef = useRef(null);
  const [rowData, setRowData] = useState([]);
  const { data: session } = useSession();
  const [gridApi, setGridApi] = useState(null);

  const [postId]=useRecoilState(postIdState)
  const router=useRouter()
  
  
  useEffect(() => {
    // Only run this effect if there is a session and thus a logged-in user
    if (session?.user?.uid) {
      // Set up the Firestore query for the posts collection, ordered by timestamp
      const postsQuery = query(collection(db, "posts"), orderBy("timestamp", "desc"));
  
      // Establish the real-time subscription
      const unsubscribe = onSnapshot(postsQuery, (snapshot) => {
        // Directly store the array of document snapshots if the user is logged in
        setRowData(snapshot.docs.filter(doc => doc.data().id === session.user.uid));
      });
  
      // Return the unsubscribe function for cleanup
      return () => unsubscribe();
    } else {
      // If there's no session, set the posts state to an empty array
      setRowData([]);
    }
  }, [session]);
  console.log("setRowData", setRowData)


  useEffect(() => {
    const userPosts = rowData.filter(post => post?.data()?.id === session.user.uid)
    const formattedData = userPosts.map(Proj => ({
      title: Proj?.data()?.projectTitle,
      description: Proj?.data()?.projectDescription,
      projectEndDate: Proj?.data()?.projectEndDate,
      userId: Proj?.data()?.id,
      id:Proj?.id
      // You can format the date or include other fields as needed
    }));
    console.log("Formatted_data",formattedData)
    setP(formattedData);
  }, [rowData, session]); // This effect runs whenever the posts data changes


  {/*useEffect(() => {
    // Only run this effect if there is a session and thus a logged-in user
    if (session?.user?.uid) {
      // Set up the Firestore query for the posts collection, ordered by timestamp
      const postsQuery = query(collection(db, "posts"), orderBy("timestamp", "desc"));
  
      // Establish the real-time subscription
      const unsubscribe = onSnapshot(postsQuery, (snapshot) => {
        // Directly store the array of document snapshots if the user is logged in
        setP(snapshot.docs.filter(doc => doc.data().id === session.user.uid));
      });
  
      // Return the unsubscribe function for cleanup
      return () => unsubscribe();
    } else {
      // If there's no session, set the posts state to an empty array
      setP([]);
    }
  }, [session]);
  
  useEffect(() => {
    const formattedData = p.map(post => ({
      title: post.projectTitle,
      description: post.projectDescription,
      projectEndDate: post.projectEndDate,
      // You can format the date or include other fields as needed
    }));
    setRowData(formattedData);
  }, [p]); // This effect runs whenever the posts data changes*/}


  const onGridReady = (params) => {
    setGridApi(params.api); // Save the grid API for later use
    console.log("Grid is ready", params.api);
    gridRef.current = gridApi; // Ensure the gridRef is correctly assigned
  };
  
  

  const columns = [
    { headerName: "Title", field: "title", sortable: true,floatingFilter:true, flex: 1, 
     cellStyle: { fontSize: '16px'} },
    { headerName: "Description", field: "description", sortable: true, floatingFilter:true, flex: 3,
     cellStyle: { fontSize: '16px' } },
    { headerName: "End Date", field: "projectEndDate", sortable: true, floatingFilter:true, flex: 1,
   cellStyle: { fontSize: '16px' } },
   { headerName: "Collaborators", field: "Collaborators", sortable: true, floatingFilter:true, flex: 1,
   cellStyle: { fontSize: '16px' } },
   { headerName: "Endorsements", field: "Endorsements", sortable: true,  flex: 1,
   cellStyle: { fontSize: '16px' } },

  ];




  const onRemoveSelected = async () => {
    const selectedNodes = gridApi.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    for (let data of selectedData) {
        
      if (data.userId === session.user.uid) { // Ensure only the session user can delete their posts
        console.log("postid", data.id)
        await deleteDoc(doc(db, "posts", data.id)); // Adjust "posts" and "id" field as necessary

        // If there's an image to delete, use deleteObject from Firebase storage
        // Example: if (data.image) { await deleteObject(ref(storage, `posts/${data.id}/image`)); }
      }
    }

    // Refresh the grid data here after deletion
    // You might need to fetch the data again or remove the deleted items from the grid's dataset
  };

  return (
    <div>
    <button onClick={onRemoveSelected} className="mb-2 p-2 bg-red-500 text-white rounded">Delete Selected Rows</button>
    
    <main className="">
        
      {/*Sidebar*/}
      
    <div className="ag-theme-alpine" style={{ height: 720, width: '100%' }}>
      <AgGridReact
        rowSelection="multiple"
        rowData={p}
        columnDefs={columns}
        rowHeight={50}
        //domLayout='autohe' // This adjusts the grid height based on row content
        animateRows={true}
        onGridReady={onGridReady}
        defaultColDef={{
          flex: 1,
          minWidth: 100,
          filter: true,
          resizable: true,
        }}
      />
    </div>
  </main>
        
    </div>
  );
};
