class AuthController {
  constructor(registerUC, loginUC) {
    this.registerUC = registerUC;
    this.loginUC    = loginUC;
  }

  async register(req, res, next) {
    try {
      const data = await this.registerUC.execute(req.body);
      res.status(201).json({ success: true, data });
    } catch (err) {
      next(err);
    }
  }

  async login(req, res, next) {
    try {
      const data = await this.loginUC.execute(req.body);
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = AuthController;