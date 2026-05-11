import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ error: "No token" });
    }

    // formato: "Bearer TOKEN"
    const cleanToken = token.split(" ")[1];

    const decoded = jwt.verify(cleanToken, process.env.JWT_SECRET);

    req.user = decoded; // 🔥 aquí vive req.user.id

    next();
  } catch (error) {
    return res.status(401).json({ error: "Token inválido" });
  }
};

export default auth;