const { successHandler, errorHandler } = require('../../responseHandler');
const { message, validateFieldKeyExist } = require('../../libs');
const Post = require('../../models/post');

const patchPost = (data) => {
  const { req, res } = data;
  const { noData, formatFail } = message;

  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });

  req.on('end', async () => {
    const id = req.url.split('/').pop();
    try {
      const post = JSON.parse(body);

      const fieldValidate = validateFieldKeyExist(Post, post);

      if (fieldValidate.status) {
        await Post.findByIdAndUpdate(id, post)
          .then(async () => {
            const posts = await Post.find();
            successHandler(res, posts);
          })
          .catch(() => {
            errorHandler(res, 400, noData);
          });
      } else {
        errorHandler(res, 400, fieldValidate);
      }
    } catch (error) {
      errorHandler(res, 400, `${formatFail}，更新失敗`);
    }
  });
};

module.exports = patchPost;
