require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const neo4j_calls = require('../../neo4j_calls/neo4j_api');
const router = express.Router();

/**
 * Generates a token for a user with their email and a super secret password!
 * @param email - a users email... duh
 * @returns a token needed for special API requests
 */
function generateToken(email) {
    const token = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: '3h' });
    return token;
}

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
            const token = generateToken(email);
            res.json({"token": token});
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