const jwt = require("jsonwebtoken");

function verifyJWT(request, response, next) {
  const token = request.headers["token"];

  if (!token) {
    return response.status(500).json({
      auth: false,
      message: "Failed to authenticate token."
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
    if (err) {
      return response.status(500).json({
        auth: false,
        message: "Failed to authenticate token"
      });
    }
    request.userId = decoded.id;
    next();
  });
}

module.exports = { verifyJWT };
