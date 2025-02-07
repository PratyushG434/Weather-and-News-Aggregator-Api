import jwt from 'jsonwebtoken';

export function authenticateToken(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1]; // Get token from Authorization header

    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    // Verifying the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {

            if (err.name === 'TokenExpiredError') {
                return res.status(403).json({ error: 'Token has expired. Please log in again.' });
            }


            if (err.name === 'JsonWebTokenError') {
                return res.status(403).json({ error: 'Invalid token. Please try again.' });
            }

            // Default 
            return res.status(403).json({ error: 'Invalid or expired token.' });
        }

        // Extracting user id from the jwt token and attaching it in the req
        console.log(decoded.userId);
        req.userId = decoded.userId;
        console.log(req.userId);
        next();
    });
}

