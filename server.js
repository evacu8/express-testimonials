const express = require('express');
const hbs = require('express-handlebars');
const path = require('path');
const app = express();

const testimonialsRoutes = require('./routes/testimonials.routes');

app.engine('hbs', hbs());
app.set('view engine', 'hbs');

app.engine('hbs', hbs({ extname: 'hbs', layoutsDir: './layouts', defaultLayout: 'main' }));

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api', testimonialsRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});