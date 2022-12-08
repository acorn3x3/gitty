const pool = require('../utils/pool');
module.exports = class GitHubUser {
  id;
  email;
  login;
  avatar;

  constructor(row) {
    this.id = row.id;
    this.email = row.email;
    this.login = row.login;
    this.avatar = row.avatar;
  }

  static async getByLogin(login) {
    const { rows } = await pool.query(
      ` SELECT * 
        FROM github_users
        WHERE login=$1
        `,
      [login]
    );
    if (!rows[0]) return null;
    return new GitHubUser(rows[0]);
  }

  static async insert({ login, email, avatar }) {
    if (!login) throw new Error('login is required yo');

    const { rows } = await pool.query(
      `INSERT INTO github_users (login , email, avatar)
        VALUES ($1, $2, $3)
        RETURNING *
        `,
      [login, email, avatar]
    );
    return new GitHubUser(rows[0]);
  }
};
