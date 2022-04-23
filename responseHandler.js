const { headers, message } = require('./libs');

const successHandler = (res, data) => {
  res.writeHead(200, headers);
  res.write(JSON.stringify({
    status: 'success',
    data,
  }));
  res.end();
};

const errorHandler = (res, statusCode, messageContent) => {
  const { wrongKey, wrongValue } = message;

  res.writeHead(statusCode, headers);
  let newMessage;

  if (typeof (messageContent) === 'string') {
    newMessage = messageContent;
  } else if (typeof (messageContent) === 'object') {
    const errorText = [];
    Object.keys(messageContent.errors).forEach((item) => {
      /** 錯誤訊息 自訂 => payload 中的 key 不存在 schema 內 */
      if (Object.prototype.hasOwnProperty.call(messageContent, 'status')) {
        errorText.push(`${messageContent.errors[item]} ${wrongKey}`);
      }
      /** 錯誤訊息 Mongoose => schema key required 的值不得為空 */
      if (Object.prototype.hasOwnProperty.call(messageContent.errors[item], 'properties')) {
        errorText.push(`${messageContent.errors[item].properties.message}${wrongValue}`);
      }
    });
    newMessage = errorText;
  }

  res.write(JSON.stringify({
    status: 'fail',
    message: newMessage,
  }));
  res.end();
};

module.exports = {
  successHandler,
  errorHandler,
};
