const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
});

router.get('/areyoualive', (req, res) => {
    res.status(200).send("Yes");
});

module.exports = router;