import React, { useState } from 'react'


// firestore ============================================================
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { firebaseConfig } from '../firebase';
import { getFirestore, collection, addDoc } from "firebase/firestore";
// ======================================================================

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

const db = getFirestore(app);



const ResourceAdd = () => {

  const [resource, setResource] = 
    useState({ imageFile: null, imageName: '', name: '', birthday: '', gender: '', job: ''});


  const handleFileChange = (e) => {
    const resourceCopy = {...resource, imageFile: e.target.files[0], imageName: e.target.files[0].name};
    setResource(resourceCopy);
  };


  const handleValueChenge = (e) => {
    const keyValue = e.target.name;
    const resourceCopy = {...resource, [keyValue]: e.target.value };
    setResource(resourceCopy);
  };


  const uploadResourceData = async (imagePath) => {
    try {
      const docRef = await addDoc(collection(db, "HeenWoo_Com"), {
        image: imagePath,
        name: resource.name,
        birthday: resource.birthday,
        gender: resource.gender,
        job: resource.job,
      });
      console.log("Document written with ID: ", docRef.id);
      alert("resource 가 저장되었습니다.");
      // navigate('/recipe/'+ docRef.id);
      window.location.reload();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }


  const handleSubmit = (e) => {

    e.preventDefault();
    const storageRef = ref(storage, `images/${resource.imageName}`);

    uploadBytes(storageRef, resource.imageFile).then((snapshot) => {
      console.log('Uploaded a blob or file!');

      getDownloadURL(snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
        const imagePath = downloadURL;
        uploadResourceData(imagePath);
      });      
    })
  };


  return (
    <div style={{marginLeft: 50}}>
      <h1>Resource 추가</h1>
      image : <input type="file" name='imageFile' onChange={handleFileChange} /><br/>
      name : <input type="text" name='name' value={resource.name} onChange={handleValueChenge} /><br/>
      birthday : <input type="text" name='birthday' value={resource.birthday} onChange={handleValueChenge} /><br/>
      gender : <input type="text" name='gender' value={resource.gender} onChange={handleValueChenge} /><br/>
      job : <input type="text" name='job' value={resource.job} onChange={handleValueChenge} /><br/>
      <button onClick={handleSubmit}>Add Resource</button>
    </div>
  )
}

export default ResourceAdd