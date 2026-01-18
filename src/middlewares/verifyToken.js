import jwt from "jsonwebtoken";

const jwt_SECRET = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;//sengaja salah
  if (!authHeader) {
    return res.status(401).json({ eror: "Token requiredd" });
  }
  const token = authHeader.split("")[1];

  try {
    const decoded = jwt.verify(token, jwt_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      massage: "Token tidak valid",
    });
  }
};
