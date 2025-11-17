const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {

  const token = req.headers["authorization"];

  if (!token) {

    return res.status(401).json({ message: "No token, authorization denied" });

  }

  try {

    // Token format → "Bearer xxxxx"

    const tokenValue = token.split(" ")[1];

    const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET);

    req.admin = decoded; // store admin info in request

    next();

  } catch (err) {

    return res.status(401).json({ message: "Token is not valid" });

  }

};
 
