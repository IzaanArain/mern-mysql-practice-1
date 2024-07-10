const pool = require("../config/db");

const getPosts = async () => {
  const [rows] = await pool.query("SELECT * FROM posts");
  console.log(rows);
  return rows;
};
// getPost()

const getPost = async (id) => {
  let sql = `
    SELECT * FROM posts
    WHERE id = ?
    `;
  const [rows] = await pool.query(sql, [id]);
  console.log(rows[0]);
  const result = rows[0];
  return result;
};
// getPost(3)

const createPost = async (title, body) => {
  let d = new Date();
  let yyyy = d.getFullYear();
  let mm = d.getMonth() + 1;
  let dd = d.getDate();
  let createdAtDate = `${yyyy}-${mm}-${dd}`;
  let sql = `
    INSERT INTO posts(
    title,
    body,
    createdAt
    ) 
    VALUES (?,?,?);
    `;
  const [result] = await pool.query(sql, [title, body, createdAtDate]);
  const id = result.insertId;
  return getPost(id);
};
// createPost("test", "test")

const deletePost = async (id) => {
  const postExists = await getPost(id);
  if (!postExists) return "Post does not exist";
  let sql = `
      DELETE FROM posts
      WHERE id = ?
      `;
  const [rows] = await pool.query(sql, [id]);
  console.log(rows);
  return rows;
};

module.exports = {
  getPosts,
  getPost,
  createPost,
  deletePost,
};
