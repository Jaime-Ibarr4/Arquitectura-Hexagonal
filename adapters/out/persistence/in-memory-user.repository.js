const User = require('../../../domain/models/user.model');

class InMemoryUserRepository {
  constructor() {
    this.users = [];
  }

  async findByUsername(username) {
    return this.users.find(u => u.username === username) || null;
  }

  async add({ username, password }) {
    const user = new User({ username, password });
    this.users.push(user);
    return user;
  }
}

module.exports = InMemoryUserRepository;