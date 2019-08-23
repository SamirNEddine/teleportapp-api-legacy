const { TeamType, inputFields } = require('../type');
const { createTeamResolver } = require('./resolvers');
const { authenticated } = require('../../utils');

/** Mutations definitions **/
const createTeam = {
    type: TeamType,
    args: inputFields.createTeam,
    resolve: authenticated(createTeamResolver)
};

/** Exports **/
module.exports = {
    createTeam
};