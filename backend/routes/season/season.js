require('dotenv').config();
const express = require('express');
const router = express.Router();
const neo4j_calls = require('../../neo4j_calls/neo4j_api');
const logger = require('../auth/logging').logger;
const verifyToken = require('../auth/auth');

/**
 * http://localhost:3001/season (requires body and token)
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

module.exports = router;