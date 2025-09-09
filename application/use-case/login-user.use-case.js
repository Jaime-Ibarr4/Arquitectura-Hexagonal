class LoginUserUseCase {
  constructor(userRepo, authService) {
    this.userRepo    = userRepo;
    this.authService = authService;
  }

  async execute({ username, password }) {
    const user = await this.userRepo.findByUsername(username);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    this.authService.compareCredentials(password, user.password);
    return user.toJSON();
  }
}

module.exports = LoginUserUseCase;