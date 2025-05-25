import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
console.log(authHeader, "header")
  // ✅ Check if header exists and starts with 'Bearer '
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: 'Unauthorized: Token missing or malformed' });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, SECRET_KEY, (err, decodedUser) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden: Invalid or expired token' });
    }
    console.log(decodedUser, "decodedUser")

    req.user = decodedUser; // Attach decoded user to request
    console.log('✅ Middleware executed');
    next();
  });
};

export { authenticateToken };
