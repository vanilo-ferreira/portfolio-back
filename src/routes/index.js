const express = require('express')
const { contacteMe } = require('../controllers/contact');

const routes = express();

routes.post('/contact-me', contacteMe);

module.exports = routes;