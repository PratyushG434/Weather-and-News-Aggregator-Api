import Redis from 'ioredis';

let redisClient;

if (!global.redisClient) {
    global.redisClient = new Redis(process.env.REDIS_URL,{
        lazyConnect: true, 
    });
    global.redisClient.on('error', (err) => {
        console.error('Redis Error:', err);
    });
}

redisClient = global.redisClient;

export default redisClient;