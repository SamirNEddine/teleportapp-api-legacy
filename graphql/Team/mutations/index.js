const { TeamType, inputFields } = require('../type');
const { createTeamResolver } = require('./resolvers');
const { authenticatedResolver } = require('../../../utils/authentication');

/** Mutations definitions **/
const createTeam = {
    type: TeamType,
    args: inputFields.createTeam,
    resolve: authenticatedResolver(createTeamResolver)
};

/** Exports **/
module.exports = {
    createTeam
};