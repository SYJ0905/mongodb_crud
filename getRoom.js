const { successHandler, errorHandler } = require('./responseHandler');
const Room = require('./models/room');

const getRooms = async data => {
  const { res } = data;
  const rooms = await Room.find();
  successHandler(res, rooms);
};

module.exports = {
  getRooms,
};