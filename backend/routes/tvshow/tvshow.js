require('dotenv').config();
const express = require('express');
const router = express.Router();
const neo4j_calls = require('../../neo4j_calls/neo4j_api');
const verifyToken = require('../auth/auth');

/**
 * http://localhost:3001/tvshow?title=My%20TV%20Show
 * 
 * Get all TVShow by title
 * @param title: String
 */
// TODO: Add logging
// TODO: Add validation
// TODO: Add error checking
// TODO: Reformat result?
router.get('/', async (req, res) => {
    try {
        let result = await neo4j_calls.get_tvshow(req.query.title);
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

router.post('/', verifyToken, async (req, res, next) => {
    try {
        // let result = await neo4j_calls.create_tvshow(req.body.title);
        // res.json(result);
        // auth.verifyToken(req, res);
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