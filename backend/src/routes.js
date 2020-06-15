const express = require('express');

const routes = express.Router();

routes.get('/contacts', (req, res) => {
  return res.json({ message: 'Olá!' })
});

module.exports = routes;
