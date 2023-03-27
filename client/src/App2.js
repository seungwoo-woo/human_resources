import { CircularProgress, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { useEffect, useState } from 'react';
import ResourceCard from './components/ResourceCard';
import ResourceAdd from './components/ResourceAdd';
// import './App.css';

// firestore ============================================================
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";
import { firebaseConfig } from './firebase';
// ======================================================================

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);


// const resources = [
//   {
//     id: 1,
//     image: 'https://placeimg.com/64/64/1',
//     name: 'wooseungwoo',
//     birthday: '740225',
//     gender: '남자',
//     job: '자영업자'
//   },
//   {
//     id: 2,
//     image: 'https://placeimg.com/64/64/2',
//     name: 'wooseungwoo',
//     birthday: '740225',
//     gender: '남자',
//     job: '자영업자'
//   },
//   {
//     id: 3,
//     image: 'https://placeimg.com/64/64/3',
//     name: 'wooseungwoo',
//     birthday: '740225',
//     gender: '남자',
//     job: '자영업자'
//   },
// ]; 



function App() {

  const [resources, setResources] = useState([]);
  const [progress, setProgress] = useState(0);


  useEffect(()=>{
    
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 1));
    }, 10);

    const getData = async () => {
      let data = [];
      const querySnapshot = await getDocs(query(collection(db, "HeenWoo_Com"), where("isDeleted", "==", 0)));

      querySnapshot.forEach((doc) => {
        data.push({...doc.data(), id: doc.id,})
      });
      setResources(data);
    }
    
    getData();

    return () => {
      clearInterval(timer);
    };

  }, []);



  return (
    <>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align='center'>ID</TableCell>
              <TableCell align='center'>사진</TableCell>
              <TableCell align='center'>이름</TableCell>
              <TableCell align='center'>생년월일</TableCell>
              <TableCell align='center'>성별</TableCell>
              <TableCell align='center'>직업</TableCell>
              <TableCell align='center'>설정</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {resources.length > 0 ? resources.map((man) =>       
              <ResourceCard
                key = {man.id}
                id = {man.id}
                image = {man.image}
                name = {man.name}
                birthday = {man.birthday}
                gender = {man.gender}
                job = {man.job}
              />
            ): 
            <TableRow>
              <TableCell colSpan="6" align='center'>
                <CircularProgress value={progress} />
              </TableCell>
            </TableRow>
            }
          </TableBody>
        </Table>
      </Paper>
      <ResourceAdd />
    </>
  );
}

export default App;
