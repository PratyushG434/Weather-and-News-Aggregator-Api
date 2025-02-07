import pkg from 'pg';
import dotenv from 'dotenv';

const { Pool } = pkg;
dotenv.config();

// const pool = new Pool({
//     user: process.env.PG_USER,
//     host: process.env.PG_HOST,
//     database: process.env.PG_DATABASE,
//     password: process.env.PG_PASSWORD,
//     port: process.env.PG_PORT,
// });


const pool = new Pool({
    connectionString: process.env.DATABASE_URL, // Uses .env variable
    ssl: {
        rejectUnauthorized: false, // Required for remote PostgreSQL connections
    },
});

setInterval(async () => {
    try {
        await pool.query('SELECT 1');
        console.log('Database kept alive');
    } catch (err) {
        console.error('Database ping failed:', err);
    }
}, 1800000); 

export default pool;
