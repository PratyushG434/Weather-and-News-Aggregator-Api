import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../config/db.js';
import env from 'dotenv';

env.config();


// Register logic


export async function register(req, res) {
    const { username, password } = req.body;
    const saltRounds = 10;
    //Checking if the user is already registered

    try {
        const result = await pool.query(
            "SELECT * FROM users WHERE username = $1",
            [username]
        );

        if (result.rows.length !== 0) {
            return res.status(409).json({
                message: "User already registered. Please login to continue."
            });
        }

    } catch (error) {
        console.error("Database Query Error:", error);

        return res.status(500).json({
            message: "An error occurred while retrieving the user. Please try again later.",
        });
    };


    // Insert user into the database

    try {
        const hash = await bcrypt.hash(password, saltRounds);
        await pool.query("INSERT INTO users(username, password_hashed) VALUES ($1, $2)", [username, hash]);
        return res.status(201).json({ message: "Registration successful!" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Registration failed. Please try again." });
    }
}


// Login logic 

export async function login(req, res) {
     const { username, password } = req.body;
        let user;
    
        try {
            const result = await pool.query(
                "SELECT * FROM users WHERE username = $1",
                [username]
            );
    
            if (result.rows.length === 0) {
                return res.status(404).json({
                    message: "User not found. Plese register to continue."
                });
            }
            user = result.rows[0];
    
        } catch (error) {
            console.error("Database Query Error:", error);
    
            return res.status(500).json({
                message: "An error occurred while retrieving the user. Please try again later.",
            });
        };
    
        console.log(user);
        // Compare password
        const isMatch = await bcrypt.compare(password, user.password_hashed);
        if (!isMatch) {
            return res.status(400).send('Invalid password');
        }
    
        // Generate JWT token
        
        const token = jwt.sign({ userId: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    
        res.json({token});
}