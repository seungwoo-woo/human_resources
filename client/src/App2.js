import { CircularProgress, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { useEffect, useState } from 'react';
import ResourceCard from './components/ResourceCard';
import ResourceAdd from './components/ResourceAdd';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
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
  const tableList = ['ID', '사진', '이름', '생년월일', '성별', '직업', '설정'];

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
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="home">Human Resources Management</Navbar.Brand>
          <Nav className="me-auto">
            {/* <Nav.Link href="home">Home</Nav.Link>
            <Nav.Link href="features">Features</Nav.Link>
            <Nav.Link href="pricing">Pricing</Nav.Link> */}
            <ResourceAdd />
          </Nav>
        </Container>
      </Navbar>

      <Paper style={{marginTop: 10, marginLeft: 30, marginRight: 30}}>
        <Table>
          <TableHead style={{backgroundColor: '#DBDBDB'}}>
            <TableRow>
              {tableList.map((item) => {
                return <TableCell style={{fontSize: '1.1rem', fontWeight: 600}} align='center'>{item}</TableCell>
              })}
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
              <TableCell colSpan="7" align='center'>
                <CircularProgress value={progress} />
              </TableCell>
            </TableRow>
            }
          </TableBody>
        </Table>
      </Paper>
      
    </>
  );
}

export default App;
