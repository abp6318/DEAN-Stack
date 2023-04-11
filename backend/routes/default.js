const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    res.send("Try /tvshows to see all the shows stored in the database! Or /login to... well, login :-þ");
});

module.exports = router;