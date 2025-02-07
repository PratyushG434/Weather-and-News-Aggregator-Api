import redis from 'redis';

// Creating client to use redis 
const redisClient = redis.createClient();


redisClient.on('error', (err) => {
    console.error('Redis Error:', err);
});




export default redisClient;