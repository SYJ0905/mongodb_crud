const http = require('http');
const libs = require('./libs');
const { errorHandler } = require('./responseHandler');
const { getRooms, getRoom } = require('./getRoom');
const addRoom = require('./addRoom');
const { deleteRooms, deleteRoom } = require('./deleteRoom');
const patchRoom = require('./patchRoom');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});

const mongoose = require('mongoose');
const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD,
)

// 連接資料庫
mongoose.connect(DB)
  .then(() => {
    console.log('資料庫連線成功');
  })
  .catch(error => {
    console.log(error);
  });

const requestListener = (req, res) => {
  const { url, method } = req;
  const { headers, message } = libs;

  const data = {
    req,
    res,
  };

  if (url === '/rooms' && method === 'GET') {
    getRooms(data);
  } else if (url.startsWith('/rooms/') && method === 'GET') {
    getRoom(data);
  } else if (url === '/rooms' && method === 'POST') {
    addRoom(data);
  } else if (url === '/rooms' && method === 'DELETE') {
    deleteRooms(data);
  } else if (url.startsWith('/rooms/') && method === 'DELETE') {
    deleteRoom(data);
  } else if (url.startsWith('/rooms/') && method === 'PATCH') {
    patchRoom(data);
  } else if (method === 'OPTIONS') {
    res.writeHead(200, headers);
    res.end();
  } else {
    errorHandler(res, 404, message[404]);
  }
}

const server = http.createServer(requestListener);

server.listen(process.env.PORT);