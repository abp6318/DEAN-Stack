require('dotenv').config();
const express = require('express');
const router = express.Router();
const neo4j_calls = require('../../neo4j_calls/neo4j_api');

/**
 * http://localhost:3001/tvshows
 * 
 * Get all TVShows
 * @params none
 */
// TODO: Add logging
// TODO: Reformat result?
router.get('/', async (req, res) => {
    try {
        let result = await neo4j_calls.get_all_nodes();
        res.json(result);
        res.status(200);
        res.end();
    } catch (error) {
        console.log(error);
        res.json({"error": "Something went wrong!"});
        res.status(500);
        res.end();
    }
});

module.exports = router;