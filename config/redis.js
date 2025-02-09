import { createClient } from "redis";
import env from 'dotenv';

env.config();
const client = createClient ({
  url : process.env.REDIS_URL
});

client.on("error", function(err) {
  throw err;
});
await client.connect()

export default redisClient;
