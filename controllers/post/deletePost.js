const { successHandler, errorHandler } = require('../../responseHandler');
const { message } = require('../../libs');
const Post = require('../../models/post');

const deletePosts = async (data) => {
  const { res } = data;
  await Post.deleteMany({});
  const posts = await Post.find();
  successHandler(res, posts);
};

const deletePost = async (data) => {
  const { req, res } = data;
  const { noData } = message;

  const id = req.url.split('/').pop();
  await Post.findByIdAndDelete(id)
    .then(async () => {
      const posts = await Post.find();
      successHandler(res, posts);
    })
    .catch(() => {
      errorHandler(res, 400, noData);
    });
};

module.exports = {
  deletePosts,
  deletePost,
};
