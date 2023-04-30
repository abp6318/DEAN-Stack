require('dotenv').config();
const express = require('express');
const router = express.Router();
const neo4j_calls = require('../../neo4j_calls/neo4j_api');
const logger = require('../auth/logging').logger;
const verifyToken = require('../auth/auth');

/**
 * http://localhost:3001/api/season (requires body and token)
 * 
 * Create a new season!
 * @param email: String - a user's email
 * @param tvshowId: Int - the ID of the TVShow you are adding a season too
 * @param seasonNumber: Int - the season's number
 * @param summary: String - the summary for the new season
 */
// TODO: Change result to not be so revealing!
// TODO: Error checking
// TODO: Better error messages
// TODO: Validation of user input
router.post('/', verifyToken, async (req, res, next) => {
    try {
        const { email, seasonNumber, summary, tvshowId } = req.body;
        const today = new Date();
        const time = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
        let result = await neo4j_calls.create_season(email, seasonNumber, summary, tvshowId, time);
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
            endpoint: 'POST /season',
            email: req.body.email || req.query.email || "No email provided / User not logged in"
        });
    }
});

/**
 * http://localhost:3001/api/season (requires body and token)
 * 
 * Update a season and log who modified the database
 * @param email: String - a user's email
 * @param id: Int - the ID for the Neo4j object being modified
 * @param seasonNumber: Int - the new seasonNumber
 * @param summary: String - the new summary
 */
// TODO: Change result to not be so revealing!
// TODO: Error checking
// TODO: Better error messages
// TODO: Validation of user input
router.put('/', verifyToken, async (req, res, next) => {
    try {
        const { email, id, seasonNumber, summary } = req.body;
        const today = new Date();
        const time = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
        let result = await neo4j_calls.update_season(email, id, seasonNumber, summary, time);
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
            endpoint: 'PUT /season',
            email: req.body.email || req.query.email || "No email provided / User not logged in"
        });
    }
});

/**
 * http://localhost:3001/api/season (requires body and token)
 * 
 * Delete a season and all related subnodes from the database
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
        let result = await neo4j_calls.delete_season(id);
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
            endpoint: 'DELETE /season',
            email: req.body.email || req.query.email || "No email provided / User not logged in"
        });
    }
});

module.exports = router;