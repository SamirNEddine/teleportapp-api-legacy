const { connectToDb } = require('../utils/mongoose');
const User = require('../mongo/models/User');
const { BigQuery } = require('@google-cloud/bigquery');

const bigQuery = new BigQuery();

const ADD_CONTACT_WEIGHT = 100;
const ADD_BY_CONTACT_WEIGHT = 20;

async function addContactQuery() {
    const query = `SELECT COUNT(conversation_id) as conversations, contact_id as contact, user_id as user
      FROM \`api_dev.add_contact_view\` as ADD_CONTACT
      GROUP BY user, contact
      ORDER BY conversations DESC`;
    const options = {
        query: query
    };
    const [job] = await bigQuery.createQueryJob(options);
    console.log(`Job ${job.id} started.`);

    const [rows] = await job.getQueryResults();
    return rows;
}

async function updateContactsScore(){
    const addContactQueryResults = await addContactQuery();
    console.log(addContactQueryResults);
    const users = {};

    const addContactScore = function(contactId, userId, score){
        if (!users[userId]) users[userId] = [];
        const contacts = users[userId];
        const contactIndex = contacts.findIndex(c => c.contactId === contactId);
        const contact = contactIndex !== -1 ? contacts[contactIndex] : {contactId: contactId, score: 0};
        contact.score += score;
        contactIndex !== -1 ? contacts[contactIndex] = contact : contacts.push(contact);
    };

    addContactQueryResults.forEach( row => {
        //Score part 1: Contacts added by the user
        addContactScore(String(row.contact), String(row.user), ADD_CONTACT_WEIGHT*row.conversations);
        //Score part 2: Contact who add the user
        addContactScore(String(row.user), String(row.contact), ADD_BY_CONTACT_WEIGHT*row.conversations);
    });
    console.log('Add Contact users\n', users);
}

function main() {
    updateContactsScore();
}
main(...process.argv.slice(2));