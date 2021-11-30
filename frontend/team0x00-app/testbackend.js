const express = require('express');
const cors = require('cors')
const app = express();

const PORT = 8000
const LOCALHOST_URL=`http://localhost:${PORT}/`

const users = [
  {
      id: 0,
      username: 'Kelly Amber',
      email: 'kelly@amber.com',
      admin: true,
  },
  {
      id: 1,
      username: 'Tina Allen',
      email: 'tina@allen.com',
      admin: false,
  },
  {
      id: 2,
      username: 'David Baley',
      email: 'david@baley.com',
      admin: false,
  },
  {
      id: 3,
      username: 'Adam Hollow',
      email: 'adam@hollow.com',
      admin: true,
  },
]


const comments = [
  {
      id: 0,
      user: users[1],
      content: 'omg i want this so baaad 😩😩'
  },
  {
      id: 1,
      user: users[2],
      content: 'better not be earl gray that sh*t stinks gurl'
  },
  {
      id: 2,
      user: users[0],
      content: 'u know u are always welcome for a tea Tina 🥰'
  },
  {
      id: 3,
      user: users[2],
      content: 'bruh i already told ya that this 3D interior design shit sucks ass, get a real job bro'
  },
  {
      id: 4,
      user: users[3],
      content: 'y u so rude my man, hurts my feelings'
  }
]

app.use(cors());

app.use('/login', (req, res) => {
  res.send({
    token: 'test123'
  });
});

app.use('/getcomments', (req, res) => {
  res.send(comments);
  console.log("/getcomments")
});


app.listen(PORT, () => console.log(`API is running on ${LOCALHOST_URL}`));