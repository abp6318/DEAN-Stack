require('dotenv').config();
const express = require('express');
const router = express.Router();
const neo4j_calls = require('../../neo4j_calls/neo4j_api');
const logger = require('../auth/logging').logger;
const verifyToken = require('../auth/auth');

/**
 * http://localhost:3001/api/episode (requires body and token)
 * 
 * Create a new episode!
 * @param email: String - a user's email
 * @param seasonId: Int - the ID of the Season you are adding an episode too
 * @param airDate: String - date the episode aired on
 * @param episodeNumber: Int - the episode's number
 * @param plot: String - the plot for the new episode
 * @param title: String - the title for the new episode
 */
// TODO: Change result to not be so revealing!
// TODO: Error checking
// TODO: Better error messages
// TODO: Validation of user input
router.post('/', verifyToken, async (req, res, next) => {
    try {
        const { email, airDate, episodeNumber, plot, title, seasonId } = req.body;
        const today = new Date();
        const time = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
        let result = await neo4j_calls.create_episode(email, airDate, episodeNumber, plot, title, seasonId, time);
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
            endpoint: 'POST /episode',
            email: req.body.email || req.query.email || "No email provided / User not logged in"
        });
    }
});

/**
 * http://localhost:3001/api/episode (requires body and token)
 * 
 * Update an episode and log who modified the database
 * @param email: String - a user's email
 * @param id: Int - the ID for the Neo4j object being modified
 * @param airDate: String - date the episode aired on
 * @param episodeNumber: Int - the episode's number
 * @param plot: String - the plot for the new episode
 * @param title: String - the title for the new episode
 */
// TODO: Change result to not be so revealing!
// TODO: Error checking
// TODO: Better error messages
// TODO: Validation of user input
router.put('/', verifyToken, async (req, res, next) => {
    try {
        const { email, airDate, episodeNumber, plot, title, id } = req.body;
        const today = new Date();
        const time = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
        let result = await neo4j_calls.update_episode(email, airDate, episodeNumber, plot, title, id, time);
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
 * http://localhost:3001/api/episode (requires body and token)
 * 
 * Delete a episode and all related subnodes from the database
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
        let result = await neo4j_calls.delete_episode(id);
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
            endpoint: 'DELETE /episode',
            email: req.body.email || req.query.email || "No email provided / User not logged in"
        });
    }
});

module.exports = router;