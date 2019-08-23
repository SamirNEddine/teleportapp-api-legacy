const { TeamType, inputFields } = require('../type');
const { teamResolver } = require('./resolvers');
const { authenticated } = require('../../utils');

/** Queries definitions **/
const team = {
    type: TeamType,
    args: inputFields.team,
    resolve: authenticated(teamResolver)
};

/** Exports **/
module.exports = {
    team
};