const redis = require('redis')

const client = redis.createClient(
    process.env.REDIS_PORT,
    process.env.REDIS_HOST,
    {
        no_ready_check: true
    }
);

client.on('error', function(err){
    console.error(err);
});


client.auth(process.env.REDIS_PASSWORD, function () {
    console.log('Redis client connected');
});


module.exports = {
    client
}