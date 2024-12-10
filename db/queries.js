const pool = require("./pool");

async function createUser(fullName, username, hashedPassword) {
  const { rows } = await pool.query(
    "INSERT INTO users (full_name, username, password, membership_status) VALUES ($1, $2, $3, $4) RETURNING id",
    [fullName, username, hashedPassword, "standard"]
  );
}

async function createMessage(title, text, user_id) {
  const { rows } = await pool.query(
    "INSERT INTO messages (title, text, user_id) VALUES ($1, $2, $3)",
    [title, text, user_id]
  );
}

async function upgradeMembership(user_id) {
  const { rows } = await pool.query(
    `UPDATE users SET membership_status = $1 WHERE id = $2`,
    ["premium", user_id]
  );
}

async function getUsername(user_id) {
  const { rows } = await pool.query(
    `SELECT username FROM users WHERE id = $1`,
    [user_id]
  );
  return rows[0].username;
}

async function getMessages() {
  const { rows } = await pool.query(`SELECT * FROM messages`);
  console.log(rows)
  return rows;
}
module.exports = {
  createUser,
  createMessage,
  upgradeMembership,
  getUsername,
  getMessages,
};
