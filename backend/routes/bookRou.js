const express = require('express');
const router = express.Router();
const { bookData, featuredBooks } = require('../controllers/bookCont');

router.get('/data', bookData);
router.get('/featured', featuredBooks)


module.exports = router;