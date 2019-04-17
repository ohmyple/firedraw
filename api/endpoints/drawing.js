
const express = require('express')
const router = express.Router()

router.get(':id', (req, res, next) => {
    res.send('get drawing by id')
});

router.post('/', (req, res, next) => {
    res.send('create drawing')
});

module.exports = router;