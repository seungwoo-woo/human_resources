import React from 'react'

// firestore ============================================================
import { initializeApp } from "firebase/app";
import { firebaseConfig } from '../firebase';
import { getFirestore, doc, updateDoc } from "firebase/firestore";
// ======================================================================

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);



const ResourceDelete = (props) => {
  const {id} = props;

  const handleDeleteResource = async (id) => {

    try {
      const docRef = await updateDoc(doc(db, "HeenWoo_Com", id), {
        isDeleted: 1,
      });
      alert("resource 가 삭제되었습니다.");
      // navigate('/recipe/'+ docRef.id);
      window.location.reload();
    } catch (e) {
      console.error("Error adding document: ", e);
    }

  }


  return (
    <button onClick={() => {handleDeleteResource(id)}}>삭제</button>
  )
}

export default ResourceDelete