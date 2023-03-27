import React, { useState } from 'react'
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';

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


// ##############################################################################

const ResourceAdd = () => {

  const [resource, setResource] = 
    useState({ imageFile: null, imageName: '', name: '', birthday: '', gender: '', job: '', isDeleted: 0});

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleClickOpen = () => {
    setIsDialogOpen(true);
  };
  
  const handleClickClose = () => {
    setIsDialogOpen(false);
  }

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
        isDeleted: resource.isDeleted,
      });
      console.log("Document written with ID: ", docRef.id);
      alert("resource 가 저장되었습니다.");
      // navigate('/recipe/'+ docRef.id);
      window.location.reload();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

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
    setIsDialogOpen(false);
  };


  return (
    <div>
      <Button variant='contained' color='primary' onClick={handleClickOpen}>
        Human Resource 추가
      </Button>
      <Dialog open={isDialogOpen} onClose={handleClickClose}>
        <DialogTitle>Human Resource 추가</DialogTitle>
        <DialogContent>
          <input style={{display: 'none'}} accept="image/*" id="raised-button-file" type="file" onChange={handleFileChange} />
          <label htmlFor='raised-button-file'>
            <Button variant='contained' color='primary' component='span' name='imageFile'>
              {resource.imageName === "" ? "이미지 선택" : resource.imageName}
            </Button><br/>
          </label>
          <TextField label='name' type="text" name='name' value={resource.name} onChange={handleValueChenge} /><br/>
          <TextField label='birthday' type="text" name='birthday' value={resource.birthday} onChange={handleValueChenge} /><br/>
          <TextField label='gender' type="text" name='gender' value={resource.gender} onChange={handleValueChenge} /><br/>
          <TextField label='job' type="text" name='job' value={resource.job} onChange={handleValueChenge} /><br/>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' color='primary' onClick={handleSubmit}>Add</Button>
          <Button variant='contained' color='outlined' onClick={handleClickClose}>close</Button>

        </DialogActions>
      </Dialog>

    </div>
  )
}

export default ResourceAdd