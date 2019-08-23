const { TeamType, inputFields } = require('../type');
const { teamResolver } = require('./resolvers');

/** Queries definitions **/
const team = {
    type: TeamType,
    args: inputFields.team,
    resolve: teamResolver
};

/** Exports **/
module.exports = {
    team
};