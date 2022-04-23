const http = require('http');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const libs = require('./libs');
const { errorHandler } = require('./responseHandler');
const { getPosts, getPost } = require('./controllers/post/getPost');
const addPost = require('./controllers/post/addPost');
const { deletePosts, deletePost } = require('./controllers/post/deletePost');
const patchPost = require('./controllers/post/patchPost');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD,
);

// 連接資料庫
mongoose.connect(DB)
  .then(() => {
    console.log('資料庫連線成功');
  })
  .catch((error) => {
    console.log(error);
  });

const requestListener = (req, res) => {
  const { url, method } = req;
  const { headers, message } = libs;

  const data = {
    req,
    res,
  };

  if (url === '/posts' && method === 'GET') {
    getPosts(data);
  } else if (url.startsWith('/posts/') && method === 'GET') {
    getPost(data);
  } else if (url === '/posts' && method === 'POST') {
    addPost(data);
  } else if (url === '/posts' && method === 'DELETE') {
    deletePosts(data);
  } else if (url.startsWith('/posts/') && method === 'DELETE') {
    deletePost(data);
  } else if (url.startsWith('/posts/') && method === 'PATCH') {
    patchPost(data);
  } else if (method === 'OPTIONS') {
    res.writeHead(200, headers);
    res.end();
  } else {
    errorHandler(res, 404, message[404]);
  }
};

const server = http.createServer(requestListener);

server.listen(process.env.PORT);
