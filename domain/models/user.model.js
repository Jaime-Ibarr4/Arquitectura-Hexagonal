class User {
  constructor({ id, username, password }) {
    if (!username || !password) {
      throw new Error('Faltan username o password');
    }
    this.id       = id || Date.now().toString();
    this.username = username;
    this.password = password; // texto plano para examen
  }

  toJSON() {
    return { id: this.id, username: this.username };
  }
}

module.exports = User;