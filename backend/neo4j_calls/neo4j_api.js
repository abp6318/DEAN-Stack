require('dotenv').config();
let neo4j = require('neo4j-driver');
const _ = require('lodash');
let driver = neo4j.driver(process.env.NEO4JURI, neo4j.auth.basic(process.env.NEO4JUSERNAME, process.env.NEO4JPASSWORD));

exports.get_num_nodes = async function () {
    let session = driver.session();
    const num_nodes = await session.run('MATCH (n) RETURN n', {});
    session.close();
    return (!num_nodes ? 0 : num_nodes.records.length);
};

exports.get_all_nodes = async function () {
    let session = driver.session();
    const result = await session.run('MATCH (n) RETURN n', {});
    session.close();
    return result;
};

exports.get_tvshow = async function (title) {
    let session = driver.session();
    const result = await session.run(
        'MATCH (t:TVShow {title: "'+title+'"})-[:SEASON_OF]->(s:Season)-[:EPISODE_OF]->(e:Episode)' +
        'RETURN t, s, e',
        {}
    );
    session.close();
    return result;
};