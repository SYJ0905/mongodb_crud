const { successHandler, errorHandler } = require('./responseHandler');
const { message } = require('./libs');
const Room = require('./models/room');

const addRoom = async (data) => {
  const { req, res } = data;

  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });

  req.on('end', async () => {
    const { formatFail } = message;
    try {
      const room = JSON.parse(body);
      await Room.create(
        {
          name: room.name || undefined,
          price: room.price || undefined,
          rating: room.rating || undefined,
        },
      )
        .then(async () => {
          const rooms = await Room.find();
          successHandler(res, rooms);
        })
        .catch((error) => {
          errorHandler(res, 400, error);
        });
    } catch (error) {
      errorHandler(res, 400, `${formatFail}，新增失敗`);
    }
  });
};

module.exports = addRoom;
