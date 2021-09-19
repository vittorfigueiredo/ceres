const jwt = require("jsonwebtoken");

class AuthenticationController {
  async auth(request, response) {
    const { user, password } = request.body;

    if (user === undefined) {
      return response.status(401).json({
        success: false,
        message: "O parâmetro user é obrigatório!",
      });
    }

    if (user.length === 0) {
      return response.status(401).json({
        success: false,
        message: "O parâmetro user não pode ser vazio!",
      });
    }

    if (password === undefined) {
      return response.status(401).json({
        success: false,
        message: "O parâmetro password é obrigatório!",
      });
    }

    if (password.length === 0) {
      return response.status(401).json({
        success: false,
        message: "O parâmetro password não pode ser vazio!",
      });
    }

    if (
      user === process.env.AUTH_USER &&
      password === process.env.AUTH_PASSWORD
    ) {
      const id = process.AUTH_ID;

      const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      return response.status(201).json({
        success: true,
        token: token,
      });
    }
    return response.status(401).json({
      message: "Login inválido!",
    });
  }
}

module.exports = { AuthenticationController };
