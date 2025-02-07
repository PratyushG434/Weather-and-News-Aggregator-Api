import Redis from 'ioredis';

const redisClient = new Redis(process.env.REDIS_URL, { lazyConnect: true });

redisClient.on('error', (err) => {
    console.error('Redis Error:', err);
});


export default redisClient;