const { successHandler, errorHandler } = require('./responseHandler');
const { message, fieldKeyExist } = require('./libs');
const Room = require('./models/room');

const patchRoom = (data) => {
  const { req, res } = data;
  const { noData, wrongColumn, formatFail } = message;

  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });

  req.on('end', async () => {
    const id = req.url.split('/').pop();
    try {
      const room = JSON.parse(body);
      const fieldValidate = fieldKeyExist(Room, room);
      if (fieldValidate) {
        await Room.findByIdAndUpdate(id, room)
          .then(async () => {
            const rooms = await Room.find();
            successHandler(res, rooms);
          })
          .catch(() => {
            errorHandler(res, 400, noData);
          });
      } else {
        errorHandler(res, 400, wrongColumn);
      }
    } catch (error) {
      errorHandler(res, 400, `${formatFail}，更新失敗`);
    }
  });
};

module.exports = patchRoom;
