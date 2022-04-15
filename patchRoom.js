const { successHandler, errorHandler } = require('./responseHandler');
const { message } = require('./libs');
const Room = require('./models/room');

const patchRoom = data => {
  const { req, res } = data;
  const { noData, wrongColumn, formatFail } = message;

  let body = '';
  req.on('data', chunk => {
    body += chunk;
  });

  req.on('end', async () => {
    const id = req.url.split('/').pop();
    try {
      const room = JSON.parse(body);
      /** 檢查物件內 key 值是否存在 schema 的 key 值當中 start */
      let fieldValidate = true;
      const schemaKey = [];
      Room.prototype.schema.obj
      for (const key in Room.prototype.schema.obj) {
        if (Object.hasOwnProperty.call(Room.prototype.schema.obj, key)) {
          schemaKey.push(key);
        }
      }
      for (const key in room) {
        if (schemaKey.indexOf(key) > -1) {
          if (Object.keys(room).length > 1) {
            if (fieldValidate) {
              fieldValidate = true;
            } else {
              fieldValidate = false;
            }
          } else {
            fieldValidate = true;
          }
        } else {
          fieldValidate = false;
        }
      }
      /** 檢查物件內 key 值是否存在 schema 的 key 值當中 end */
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