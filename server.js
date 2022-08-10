const express = require('express');
const hbs = require('express-handlebars');
const path = require('path');

const app = express();

app.engine('hbs', hbs());
app.set('view engine', 'hbs');

app.engine('hbs', hbs({ extname: 'hbs', layoutsDir: './layouts', defaultLayout: 'main' }));

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});