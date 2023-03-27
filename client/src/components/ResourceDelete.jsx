import React, { useState } from 'react'
import { Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';

// firestore ============================================================
import { initializeApp } from "firebase/app";
import { firebaseConfig } from '../firebase';
import { getFirestore, doc, updateDoc } from "firebase/firestore";
// ======================================================================

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);


// ##############################################################################

const ResourceDelete = (props) => {
  const {id} = props;

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleClickOpen = () => {
    setIsDialogOpen(true);
  };
  
  const handleClickClose = () => {
    setIsDialogOpen(false);
  }

  const handleDeleteResource = async (id) => {

    try {
      const docRef = await updateDoc(doc(db, "HeenWoo_Com", id), {
        isDeleted: 1,
      });
      // navigate('/recipe/'+ docRef.id);
      window.location.reload();
    } catch (e) {
      console.error("Error adding document: ", e);
    }

  }


  return (
    <>
      <Button variant='contained' color='secondary' onClick={handleClickOpen}>삭제</Button>
      <Dialog open={isDialogOpen} onClose={handleClickClose}>
        <DialogTitle onClose={handleClickClose}>
          삭제 경고
        </DialogTitle>
        <DialogContent>
          <Typography gutterBottom>
            선택한 human resources 정보가 삭제됩니다.
          </Typography>

        </DialogContent>
        <DialogActions>
          <Button variant='contained' color='primary' onClick={(e) => {handleDeleteResource(id)}}>Delete</Button>
          <Button variant='contained' color='outlined' onClick={handleClickClose}>close</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ResourceDelete