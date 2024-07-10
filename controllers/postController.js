const Post = require("../models/postModel");

exports.getAllPosts = async (req, res) => {
  try {
    const [posts, _] = await Post.findAll();
    return res.status(200).json({
      msg: "Get all post route",
      count: posts.length,
      data: posts,
    });
  } catch (err) {
    console.error("Error", err.message);
    next(err);
  }
};

exports.createNewPost = async (req, res, next) => {
  try {
    const { title, body } = req.body;
    let newPost = new Post(title, body);
    newPost = await newPost.save();
    return res.status(201).json({
      msg: "Create new post route",
      data: newPost,
    });
  } catch (err) {
    console.error("Error", err.message);
  }
};

exports.getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    let [post, _] = await Post.findById(id);
    return res.status(200).json({
      msg: "Get post by id route",
      data: post[0],
    });
  } catch (err) {
    console.error("Error", err.message);
  }
};
