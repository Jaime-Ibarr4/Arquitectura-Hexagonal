class RegisterUserUseCase {
  constructor(userRepo) {
    this.userRepo = userRepo;
  }

  async execute({ username, password }) {
    if (await this.userRepo.findByUsername(username)) {
      throw new Error('Usuario ya existe');
    }
    const user = await this.userRepo.add({ username, password });
    return user.toJSON();
  }
}

module.exports = RegisterUserUseCase;