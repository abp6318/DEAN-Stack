require('dotenv').config();
let neo4j = require('neo4j-driver');
const _ = require('lodash');
let driver = neo4j.driver(process.env.NEO4JURI, neo4j.auth.basic(process.env.NEO4JUSERNAME, process.env.NEO4JPASSWORD));

exports.get_all_tvshows_and_sub_nodes = async function () {
    let session = driver.session();
    const result = await session.run(
        'MATCH (t:TVShow)' +
        'OPTIONAL MATCH (s:Season)-[:SEASON_OF]->(t)' +
        'OPTIONAL MATCH (e:Episode)-[:EPISODE_OF]->(s)' +
        'RETURN t, s, e',
        {}
    );    
    session.close();
    return result;
};

exports.get_tvshow = async function (title) {
    let session = driver.session();
    const result = await session.run(
        'MATCH (t:TVShow {title: "'+title+'"})' +
        'OPTIONAL MATCH (s:Season)-[:SEASON_OF]->(t)' +
        'OPTIONAL MATCH (e:Episode)-[:EPISODE_OF]->(s)' +
        'RETURN t, s, e',
        {}
    );
    session.close();
    return result;
};

exports.get_user = async function (email, password) {
    let session = driver.session();
    const result = await session.run(
        'MATCH (u:User)' +
        'WHERE u.email = "'+email+'"' +
        'return u',
        {}
    );
    session.close();
    return result;
};

exports.create_tvshow = async function (email, title, time) {
    let session = driver.session();
    const result = await session.run(
        'MATCH (u:User { email: "'+email+'" })'+
        'CREATE (t:TVShow {title: "'+title+'"})' +
        'CREATE (u)-[:ADDED {timeAdded: "'+time+'"}]->(t)',
        {}
    );
    session.close();
    return result;
};