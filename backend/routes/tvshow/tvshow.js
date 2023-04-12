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

/**
 * http://localhost:3001/tvshow (requires body and token)
 * 
 * Create a new show with a title and log who added the show to the database
 * @param email - a user's email
 * @param title - the title for the new show
 */
// TODO: Change result to not be so revealing!
// TODO: Logging
// TODO: Error checking
// TODO: Better error messages
// TODO: Validation of user input
router.post('/', verifyToken, async (req, res, next) => {
    try {
        const { email, title } = req.body;
        const today = new Date();
        const time = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
        let result = await neo4j_calls.create_tvshow(email, title, time);
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

/**
 * http://localhost:3001/tvshow (requires body and token)
 * 
 * Create a new show with a title and log who added the show to the database
 * @param email - a user's email
 * @param id - the ID for the Neo4j object being modified
 * @param title - the new title for the modified show
 */
// TODO: Change result to not be so revealing!
// TODO: Logging
// TODO: Error checking
// TODO: Better error messages
// TODO: Validation of user input
router.put('/', verifyToken, async (req, res, next) => {
    try {
        const { email, id, title } = req.body;
        const today = new Date();
        const time = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
        let result = await neo4j_calls.update_tvshow(email, id, title, time);
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