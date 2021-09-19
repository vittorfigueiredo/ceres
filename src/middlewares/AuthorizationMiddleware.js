const jwt = require("jsonwebtoken");

function verifyJWT(request, response, next) {
  const token = request.headers["token"];

  if (!token) {
    return response.status(401).json({
      auth: false,
      message: "Unauthorized!"
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
    if (err) {
      return response.status(401).json({
        auth: false,
        message: "Unauthorized!"
      });
    }
    request.userId = decoded.id;
    next();
  });
}

module.exports = { verifyJWT };
