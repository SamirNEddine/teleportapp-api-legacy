const { TeamType, inputFields } = require('../type');
const { teamResolver } = require('./resolvers');
const { authenticatedResolver } = require('../../../utils/authentication');

/** Queries definitions **/
const team = {
    type: TeamType,
    args: inputFields.team,
    resolve: authenticatedResolver(teamResolver)
};

/** Exports **/
module.exports = {
    team
};