const express = require('express');
const hbs = require('express-handlebars');
const path = require('path');

const app = express();

app.engine('hbs', hbs());
app.set('view engine', 'hbs');

app.engine('hbs', hbs({ extname: 'hbs', layoutsDir: './layouts', defaultLayout: 'main' }));

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: false }));

const db = [
  { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
  { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
];

const getById = (i) => {
  const item = db.filter(item => item.id === i)
  return item
}

const randomItem = () => {
  return Math.ceil(Math.random()*db.length);
}

const randomId = () => {
  return Math.ceil(Math.random() * 10000)
}

app.get('/testimonials', (req, res) => {
  res.json(db);
});

app.get('/testimonials/random', (req, res) => {
  res.json(getById(randomItem()));
});

app.get('/testimonials/:id', (req, res) => {
  res.json(getById(+req.params.id));
});

app.post('/testimonials', (req, res) => {
  const bodyObj = {id: randomId(), ...req.body}
  db.push(bodyObj);
  res.send({ message: 'OK' })
});

app.put('/testimonials/:id', (req, res) => {
  const newData = req.body;
  const id = +req.params.id;
  const index = db.findIndex((item) => item.id === id);
  db[index] = { id: id, ...newData };
  res.send({ message: 'OK' })
});

app.delete('/testimonials/:id', (req, res) => {
  const id = +req.params.id;
  const index = db.findIndex((item) => item.id === id);
  db.splice(index, 1)
  res.send({ message: 'OK' })
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});