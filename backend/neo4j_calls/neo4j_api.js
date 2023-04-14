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

exports.create_season = async function (email, seasonNumber, summary, tvshowId, time) {
    let session = driver.session();
    const result = await session.run(
        'MATCH (u:User { email: "'+email+'" }) ' +
        'MATCH (t:TVShow) WHERE id(t)='+tvshowId+' ' +
        'CREATE (s:Season {seasonNumber: '+seasonNumber+', summary: "'+summary+'"}) ' +
        'CREATE (s)-[:SEASON_OF]->(t) ' +
        'CREATE (u)-[:ADDED {timeAdded: "'+time+'"}]->(s)',
        {}
    );
    session.close();
    return result;
};

exports.create_episode = async function (email, airDate, episodeNumber, plot, title, seasonId, time) {
    let session = driver.session();
    const result = await session.run(
        'MATCH (u:User { email: "'+email+'" }) ' +
        'MATCH (s:Season) WHERE id(s)='+seasonId+' ' +
        'CREATE (e:Episode {airDate: "'+airDate+'", episodeNumber: '+episodeNumber+', plot: "'+plot+'", title: "'+title+'"}) ' +
        'CREATE (e)-[:EPISODE_OF]->(s) ' +
        'CREATE (u)-[:ADDED {timeAdded: "'+time+'"}]->(e)',
        {}
    );
    session.close();
    return result;
};

exports.update_tvshow = async function (email, id, title, time) {
    let session = driver.session();
    const result = await session.run(
        'MATCH (t:TVShow) where id(t)='+id+' ' +
        'MATCH (u:User { email: "'+email+'" }) ' +
        'SET t.title = "'+title+'" ' +
        'CREATE (u)-[r:UPDATED {timeUpdated: "'+time+'"}]->(t) ' +
        'return u,r,t',
        {}
    );
    session.close();
    return result;
};

exports.update_season = async function (email, id, seasonNumber, summary, time) {
    let session = driver.session();
    const result = await session.run(
        'MATCH (s:Season) where id(s)='+id+' ' +
        'MATCH (u:User { email: "'+email+'" }) ' +
        'SET s.seasonNumber = '+seasonNumber+' ' +
        'SET s.summary = "'+summary+'" ' +
        'CREATE (u)-[r:UPDATED {timeUpdated: "'+time+'"}]->(s) ' +
        'return u, s, r',
        {}
    );
    session.close();
    return result;
};

exports.update_episode = async function (email, airDate, episodeNumber, plot, title, id, time) {
    let session = driver.session();
    const result = await session.run(
        'MATCH (e:Episode) where id(e)='+id+' ' +
        'MATCH (u:User { email: "'+email+'" }) ' +
        'SET e.airDate = "'+airDate+'" ' +
        'SET e.episodeNumber = '+episodeNumber+' ' +
        'SET e.plot = "'+plot+'" ' +
        'SET e.title = "'+title+'" ' +
        'CREATE (u)-[r:UPDATED {timeUpdated: "'+time+'"}]->(e)' +
        'return u,r,e',
        {}
    );
    session.close();
    return result;
};

exports.delete_tvshow = async function (id) {
    let session = driver.session();
    const result = await session.run(
        'MATCH (tvshow:TVShow) where id(tvshow)='+id+' ' +
        'OPTIONAL MATCH (season:Season)-[:SEASON_OF]->(tvshow) ' +
        'OPTIONAL MATCH (episode:Episode)-[:EPISODE_OF]->(season) ' +
        'DETACH DELETE tvshow, season, episode',
        {}
    );
    session.close();
    return result;
};

exports.delete_season = async function (id) {
    let session = driver.session();
    const result = await session.run(
        'MATCH (season:Season) where id(season)='+id+' ' +
        'OPTIONAL MATCH (episode:Episode)-[:EPISODE_OF]->(season) ' +
        'DETACH DELETE season, episode',
        {}
    );
    session.close();
    return result;
};