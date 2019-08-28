const { TeamType, inputFields } = require('../type');
const { teamResolver } = require('./resolvers');
const { authenticatedResolver } = require('../../../utils/authentication');
const { authorizedResolver } = require('../../../utils/authorization');

/** Queries definitions **/
const team = {
    type: TeamType,
    args: inputFields.team,
    resolve: authenticatedResolver(authorizedResolver(teamResolver))
};

/** Exports **/
module.exports = {
    team
};