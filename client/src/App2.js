import { CircularProgress, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { useEffect, useState } from 'react';
// import './App.css';
import ResourceCard from './components/ResourceCard';

// firestore ============================================================
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
// ======================================================================

const firebaseConfig = {
  apiKey: "AIzaSyDDJk6cyF5XX7Ex4IbKbox_xP7eHXuyXqk",
  authDomain: "human-resources-manageme-206d2.firebaseapp.com",
  projectId: "human-resources-manageme-206d2",
  storageBucket: "human-resources-manageme-206d2.appspot.com",
  messagingSenderId: "963148542799",
  appId: "1:963148542799:web:f85d81f85cc595edac0b3a",
  measurementId: "G-6KT3C852RT"
};

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
    
    const getData = async () => {
      let data = [];
      const querySnapshot = await getDocs(collection(db, "HeenWoo_Com"));
      querySnapshot.forEach((doc) => {
        data.push({...doc.data(), id: doc.id,})
      });
      setResources(data);
    }
    
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 1));
    }, 10);

    // const getData = async () => {
    //   const response = await fetch('http://localhost:5000/api/human_resources');
    //   const body = await response.json();
    //   console.log(body);
    //   setResources(body);
    // };

    getData();

    return () => {
      clearInterval(timer);
    };

  }, []);


  return (
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
  );
}

export default App;
