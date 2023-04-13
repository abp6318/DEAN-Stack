require('dotenv').config();
const express = require('express');
const router = express.Router();
const neo4j_calls = require('../../neo4j_calls/neo4j_api');
const logger = require('../auth/logging').logger;
const verifyToken = require('../auth/auth');

/**
 * http://localhost:3001/tvshow?title=My%20TV%20Show
 * 
 * Get all TVShow by title
 * @param title: String
 */
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
    } finally {
        logger.log({
            level: 'info',
            endpoint: 'GET /tvshow',
            email: req.body.email || req.query.email || "No email provided / User not logged in"
        });
    }
});

/**
 * http://localhost:3001/tvshow (requires body and token)
 * 
 * Create a new show with a title and log who added the show to the database
 * @param email: String - a user's email
 * @param title: String - the title for the new show
 */
// TODO: Change result to not be so revealing!
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
    } finally {
        logger.log({
            level: 'info',
            endpoint: 'POST /tvshow',
            email: req.body.email || req.query.email || "No email provided / User not logged in"
        });
    }
});

/**
 * http://localhost:3001/tvshow (requires body and token)
 * 
 * Create a new show with a title and log who added the show to the database
 * @param email: String - a user's email
 * @param id: Int - the ID for the Neo4j object being modified
 * @param title: String - the new title for the modified show
 */
// TODO: Change result to not be so revealing!
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
    } finally {
        logger.log({
            level: 'info',
            endpoint: 'PUT /tvshow',
            email: req.body.email || req.query.email || "No email provided / User not logged in"
        });
    }
});

/**
 * http://localhost:3001/tvshow (requires body and token)
 * 
 * Create a new show with a title and log who added the show to the database
 * @param email: String - a user's email
 * @param id: Int - the ID for the Neo4j object being modified
 */
// TODO: Change result to not be so revealing!
// TODO: Error checking
// TODO: Better error messages
// TODO: Validation of user input
router.delete('/', verifyToken, async (req, res, next) => {
    try {
        const { id } = req.body;
        let result = await neo4j_calls.delete_tvshow(id);
        res.json(result);
        res.status(200);
        res.end();
    } catch (error) {
        console.log(error);
        res.json({"error": "Something went wrong!"});
        res.status(500);
        res.end();
    } finally {
        logger.log({
            level: 'info',
            endpoint: 'DELETE /tvshow',
            email: req.body.email || req.query.email || "No email provided / User not logged in"
        });
    }
});

module.exports = router;