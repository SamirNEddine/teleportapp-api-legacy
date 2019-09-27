const { connectToDb } = require('../utils/mongoose');
const User = require('../mongo/models/User');
const { BigQuery } = require('@google-cloud/bigquery');

const bigQuery = new BigQuery();

async function conversationsQuery() {
    const query = `SELECT conversation_id, user_id
      FROM \`api_dev.start_conversation_view\``;
    const options = {
        query: query
    };
    const [job] = await bigQuery.createQueryJob(options);
    console.log(`Job ${job.id} started.`);

    const [rows] = await job.getQueryResults();
    console.log('Rows:');
    rows.forEach(row => console.log(row));
}

function main() {
    conversationsQuery();
}
main(...process.argv.slice(2));