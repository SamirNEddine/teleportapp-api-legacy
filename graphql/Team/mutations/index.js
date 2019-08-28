const { TeamType, inputFields } = require('../type');
const { createTeamResolver } = require('./resolvers');
const { authenticatedResolver } = require('../../../utils/authentication');
const { authorizedResolver, AccessLevels } = require('../../../utils/authorization');

/** Mutations definitions **/
const createTeam = {
    type: TeamType,
    args: inputFields.createTeam,
    resolve: authenticatedResolver(authorizedResolver(createTeamResolver, AccessLevels.ADMIN))
};

/** Exports **/
module.exports = {
    createTeam
};