require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const neo4j_calls = require('../../neo4j_calls/neo4j_api');

/**
 * http://localhost:3001/login
 * 
 * Login and get a token back!
 * @param email - takes in an email - must be a valid email
 * @param password - what password? that's a secret!
 */
// TODO: Add logging
// TODO: Reformat result?
// TODO: Better token
// TODO: Lots of error checking needed
router.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await neo4j_calls.get_user(email);
        const hashedPassword = user.records[0]._fields[0].properties.password;
        if (user && await bcrypt.compareSync(password, hashedPassword, 10)) {
            res.json({"token": "12345"});
            res.status(200);
            res.end();
        } else {
            res.json({"error": "Failed login! Smelly!"});
            res.status(401);
            res.end();
        }
    } catch (error) {
        console.log(error);
        res.json({"error": "Something went wrong!"});
        res.status(500);
        res.end();
    }
});

module.exports = router;