import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
// import './App.css';
import ResourceCard from './components/ResourceCard';


const resources = [
  {
    id: 1,
    image: 'https://placeimg.com/64/64/1',
    name: 'wooseungwoo',
    birthday: '740225',
    gender: '남자',
    job: '자영업자'
  },
  {
    id: 2,
    image: 'https://placeimg.com/64/64/2',
    name: 'wooseungwoo',
    birthday: '740225',
    gender: '남자',
    job: '자영업자'
  },
  {
    id: 3,
    image: 'https://placeimg.com/64/64/3',
    name: 'wooseungwoo',
    birthday: '740225',
    gender: '남자',
    job: '자영업자'
  },
]; 

function App() {
  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>번호</TableCell>
            <TableCell>사진</TableCell>
            <TableCell>이름</TableCell>
            <TableCell>생년월일</TableCell>
            <TableCell>성별</TableCell>
            <TableCell>직업</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {resources.map((man) =>       
            <ResourceCard
              key = {man.id}
              id = {man.id}
              image = {man.image}
              name = {man.name}
              birthday = {man.birthday}
              gender = {man.gender}
              job = {man.job}
            />
          )}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default App;
