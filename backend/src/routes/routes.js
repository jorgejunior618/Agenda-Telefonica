const express = require('express');
const router = express.Router();

const contactController = require('../controllers/contactController');

router.get('/contacts', contactController.read);

router.post('/contacts', contactController.create);

router.put('/contacts/:id', contactController.update);

router.delete('/contacts/:id', contactController.delete);

module.exports = router;
