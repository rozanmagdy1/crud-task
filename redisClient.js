const redis = require('redis');
const client = redis.createClient();

client.on('ready', () => {
    console.log('Redis client connected');
});

client.on('error', (error) => {
    console.error('Redis connection error:', error);
});


module.exports = client;