const http = require("http");
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  return res.send("<h1>Server is running</h1>");
});

const {
  getPosts,
  getPost,
  createPost,
  deletePost,
} = require("./services/postService");

app.get("/posts", async (req, res) => {
  const posts = await getPosts();
  res.json({ data: posts });
});

app.get("/posts/:id", async (req, res) => {
  const { id } = req.params;
  const posts = await getPost(id);
  res.json({ data: posts });
});

app.post("/posts", async (req, res) => {
  const { title, body } = req.body;
  const posts = await createPost(title, body);
  res.json({ data: posts });
});

app.delete("/posts/:id", async (req, res) => {
  const { id } = req.params;
  const posts = await deletePost(id);
  res.json({ data: posts });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  console.error(err.name);
  console.error(err.stack);
  return res.status(500).json({ msg: "Something went rely wrong." });
});

server.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
