class AuthService {
  compareCredentials(inputPassword, storedPassword) {
    if (inputPassword !== storedPassword) {
      throw new Error('Credenciales inválidas');
    }
    return true;
  }
}

module.exports = AuthService;