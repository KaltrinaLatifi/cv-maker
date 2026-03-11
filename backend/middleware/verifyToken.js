// backend/middleware/verifyToken.js
const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error("[verifyToken] Missing JWT_SECRET");
    return res.status(500).json({ error: "Server misconfigured" });
  }

  // Expect: Authorization: Bearer <token>
  const authHeader = req.headers.authorization || "";
  const [scheme, token] = authHeader.split(" ");

  if (scheme?.toLowerCase() !== "bearer" || !token) {
    return res
      .status(401)
      .json({ error: "Missing or invalid Authorization header" });
  }

  try {
    const decoded = jwt.verify(token, secret); 
    req.user = decoded; 
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

module.exports = verifyToken;
