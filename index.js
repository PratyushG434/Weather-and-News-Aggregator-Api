import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import weatherAndNewsRoutes from './routes/weatherAndNewsRoutes.js';

import redisClient from './config/redis.js';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Connecting to Redis
(async () => {
    await redisClient.connect();
    console.log("Connected to Redis");
})();

// Routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/weatherAndNews', weatherAndNewsRoutes);

app.listen(port, () => {
    console.log('Server running at http://localhost:3000');
});

