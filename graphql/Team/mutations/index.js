const { TeamType, inputFields } = require('../type');
const { createTeamResolver } = require('./resolvers');

/** Mutations definitions **/
const createTeam = {
    type: TeamType,
    args: inputFields.createTeam,
    resolve: createTeamResolver
};

/** Exports **/
module.exports = {
    createTeam
};