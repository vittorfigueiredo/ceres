const jwt = require("jsonwebtoken");

class AuthenticationController {
  async auth(request,response) {
    const { user, password } = request.body;

    if (user === process.env.AUTH_USER && password === process.env.AUTH_PASSWORD) {
      const id = process.AUTH_ID;

      const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "1d"
      });

      return response.json({
        auth: true,
        token: token
      });
    }
    response.status(500).json({
      message: "Login inválido!"
    });
  }
}

module.exports = { AuthenticationController };
