const { successHandler, errorHandler } = require('../../responseHandler');
const { message, validateFieldKeyExist } = require('../../libs');
const Post = require('../../models/post');

const addPost = async (data) => {
  const { req, res } = data;

  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });

  req.on('end', async () => {
    const { formatFail } = message;
    try {
      const post = JSON.parse(body);

      const fieldValidate = validateFieldKeyExist(Post, post);

      if (fieldValidate.status) {
        await Post.create(
          {
            name: post.name || undefined,
            tags: post.tags || undefined,
            type: post.type || undefined,
            image: post.image || undefined,
            content: post.content || undefined,
            likes: post.likes || undefined,
            comments: post.comments || undefined,
          },
        )
          .then(async () => {
            const posts = await Post.find();
            successHandler(res, posts);
          })
          .catch((error) => {
            errorHandler(res, 400, error);
          });
      } else {
        errorHandler(res, 400, fieldValidate);
      }
    } catch (error) {
      errorHandler(res, 400, `${formatFail}，新增失敗`);
    }
  });
};

module.exports = addPost;
