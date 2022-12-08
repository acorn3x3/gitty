const pool = require('../utils/pool');
module.exports = class Post {
  id;
  title;
  content;
  user_id;
  created_at;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.content = row.content;
    this.user_id = row.user_id;
    this.created_at = row.created_at;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM posts');
    return rows.map((row) => new Post(row));
  }

  static async insert({ title, content, user_id }) {
    const { rows } = await pool.query(
      ` INSERT INTO posts (title, content, user_id)
VALUES ($1, $2, $3')
RETURNNG *
`,
      [title, content, user_id]
    );
    return new Post(rows[0]);
  }
};
