const { successHandler, errorHandler } = require('../../responseHandler');
const { message } = require('../../libs');
const Post = require('../../models/post');

const getPosts = async (data) => {
  const { res } = data;
  const posts = await Post.find();
  successHandler(res, posts);
};

const getPost = async (data) => {
  const { req, res } = data;
  const { noData } = message;
  const id = req.url.split('/').pop();

  try {
    const post = await Post.findOne(
      {
        _id: id,
      },
    );
    successHandler(res, post);
  } catch (error) {
    errorHandler(res, 400, noData);
  }
};

module.exports = {
  getPosts,
  getPost,
};
