const {promisify} = require('util');
const redis = require('redis');

const client = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);

client.on("error", function (err) {
    console.error("Redis Error: " + err);
});

module.exports.redisGetAsync = promisify(client.get).bind(client);
module.exports.redisSetAsync = promisify(client.set).bind(client);
module.exports.redisHmsetAsync = promisify(client.hmset).bind(client);
module.exports.redisHmgetAsync = promisify(client.hmget).bind(client);

