const { successHandler, errorHandler } = require('./responseHandler');
const { message } = require('./libs');
const Room = require('./models/room');

const deleteRooms = async (data) => {
  const { res } = data;
  await Room.deleteMany({});
  const rooms = await Room.find();
  successHandler(res, rooms);
};

const deleteRoom = async (data) => {
  const { req, res } = data;
  const { noData } = message;

  const id = req.url.split('/').pop();
  await Room.findByIdAndDelete(id)
    .then(async () => {
      const rooms = await Room.find();
      successHandler(res, rooms);
    })
    .catch(() => {
      errorHandler(res, 400, noData);
    });
};

module.exports = {
  deleteRooms,
  deleteRoom,
};
