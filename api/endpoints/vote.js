
const express = require('express')
const router = express.Router()

router.get('/:id', (req, res, next) => {
    res.send('get votes by id')
});

router.post('/', (req, res, next) => {
    res.send('create a prompt vote')
});

module.exports = router;