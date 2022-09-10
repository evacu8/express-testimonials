const express = require('express');
const path = require('path');
const cors = require('cors');
const { Server } = require('socket.io');
const mongoose = require('mongoose');

const app = express();

const NODE_ENV = process.env.NODE_ENV;
const DB_URI = process.env.DB_URI;
let dbUri = '';

if (NODE_ENV === 'production') dbUri = DB_URI;
else if (NODE_ENV === 'test') dbUri = 'mongodb://localhost:27017/NewWaveDBtest';
else dbUri = 'mongodb://localhost:27017/NewWaveDB';

mongoose.connect(dbUri, {
  useNewUrlParser: true,
});
const db = mongoose.connection;

db.once('open', () => {});
db.on('error', (err) => console.log('Error ' + err));

const server = app.listen(process.env.PORT || 8000, () => {});

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:8000',
    methods: ['GET', 'POST'],
  },
});

const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);

app.use(express.static(path.join(__dirname, '/client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});

io.on('connection', (socket) => {
  console.log('New socket with ID:', socket.id);
});

module.exports = server;
