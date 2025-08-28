import jwt from 'jsonwebtoken';

export default (req, res, next) => {
    const tokenBearer = req.headers.authorization;

    if (!tokenBearer) {
        return res.status(401).json({ message: "Token not provided" });
    }

    const [, token] = tokenBearer.split(" ");

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        req.email = decoded.email;
        next();
    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(401).json({ message: "Invalid token" });
    }
}