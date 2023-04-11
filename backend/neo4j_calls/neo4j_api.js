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

// exports.get_board = async function (builtCyper) {
//     let session = driver.session();
//     const result = await session.run(builtCyper, {});
//     session.close();

//     return await formatNodesAndLinks(result);
// };

// async function formatNodesAndLinks(nodesAndLinks) {
//     const nodes = [], rels = [];
//     let i = 0;
//     nodesAndLinks.records.forEach(unit => {
//         nodes.push(unit._fields[0].properties);
//         const target = i;
//         i++;

//         unit._fields[0].properties.traits.forEach(traitName => {
//             const trait = {title: traitName, label: 'trait'};
//             let source = _.findIndex(nodes, trait);
//             if (source === -1) {
//                 nodes.push(trait);
//                 source = i;
//                 i++;
//             }
//             rels.push({source, target})
//         });
//     });

//     return {nodes, links: rels};
// }