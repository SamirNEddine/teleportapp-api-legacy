const { TeamType, inputFields } = require('../type');
const { teamResolver } = require('./resolvers');
const { authenticatedResolver } = require('../../../utils/authentication');
const { authorizedResolver } = require('../../../utils/authorization');

/** Queries definitions **/
const team = {
    type: TeamType,
    args: inputFields.team,
    resolve: authorizedResolver(authenticatedResolver(teamResolver))
};

/** Exports **/
module.exports = {
    team
};