const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/human_resources', (req, res) => {
  res.send([
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
    }
  ]);
});

app.listen(port, () => console.log(`Listening on port ${port}`));