const express = require('express');
const routes = require('./routes/index');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(routes);

console.log('Server started!');

app.listen(8000);