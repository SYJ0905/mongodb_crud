const { successHandler, errorHandler } = require('./responseHandler');
const { message } = require('./libs');
const Room = require('./models/room');

const getRooms = async (data) => {
  const { res } = data;
  const rooms = await Room.find();
  successHandler(res, rooms);
};

const getRoom = async (data) => {
  const { req, res } = data;
  const { noData } = message;
  const id = req.url.split('/').pop();

  try {
    const room = await Room.findOne(
      {
        _id: id,
      },
    );
    successHandler(res, room);
  } catch (error) {
    errorHandler(res, 400, noData);
  }
};

module.exports = {
  getRooms,
  getRoom,
};
