const pool = require("./pool");

async function createUser(fullName, username, hashedPassword) {
  const { rows } = await pool.query(
    "INSERT INTO users (full_name, username, password, membership_status) VALUES ($1, $2, $3, $4) RETURNING id",
    [fullName, username, hashedPassword, "standard"]
  );
  return rows[0].id;
}

async function createMessage(title, text, user_id) {
  const { rows } = await pool.query(
    "INSERT INTO messages (title, text, user_id) VALUES ($1, $2, $3)",
    [title, text, user_id]
  );
  return rows[0];
}

async function upgradeMembership(user_id) {
  const { rows } = await pool.query(
    `UPDATE users SET membership_status = $1 WHERE id = $2`,
    ["premium", user_id]
  );
  return rows;
}

async function getUsername(user_id) {
  const { rows } = await pool.query(
    `SELECT username FROM users WHERE id = $1`,
    [user_id]
  );
  return rows;
}

async function getMessages() {
  const { rows } = await pool.query(`
    SELECT messages.id, messages.title, messages.text, messages.timestamp, users.username 
    FROM messages 
    JOIN users ON messages.user_id = users.id
  `);
  return rows;
}
async function grantAdminAccess(user_id) {
  const { rows } = await pool.query(
    `UPDATE users SET admin = true WHERE id = $1;`,
    [user_id]
  );
  return rows;
}

async function deleteMessage(message_id) {
  const { rows } = await pool.query(
    `DELETE FROM messages WHERE id = $1 RETURNING id`,
    [message_id]
  );
  return rows;
}

module.exports = {
  createUser,
  createMessage,
  upgradeMembership,
  getUsername,
  getMessages,
  grantAdminAccess,
  deleteMessage,
};
