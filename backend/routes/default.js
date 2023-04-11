const express = require('express');
const router = express.Router();

/**
 * http://localhost:3001/
 * 
 * Default route
 * @params none
 */
// TODO: Add some sort of redirect?
// TODO: Logging
router.get('/', async (req, res) => {
    res.send("Try /tvshows to see all the shows stored in the database! Or /login to... well, login :-þ");
});

module.exports = router;