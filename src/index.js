const express = require('express');
const cors = require('cors');
const routes = require('./routes/index');
require('dotenv').config();

const app = express();

app.use(express.json());

const corsOptions = {
    credentials: true,   
    optionSuccessStatus: 200,
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
};
app.use(cors(corsOptions));

app.use(routes);

console.log('Server started!');

app.listen(8000);