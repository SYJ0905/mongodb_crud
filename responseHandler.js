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
  const { wrongColumn } = message;

  res.writeHead(statusCode, headers);
  let newMessage;

  if (typeof(messageContent) === 'string') {
    newMessage = messageContent;
  } else if (typeof(messageContent) === 'object') {
    const errorText = [];
    for (const key in messageContent.errors) {
      if (Object.hasOwnProperty.call(messageContent.errors, key)) {
        errorText.push(`${messageContent.errors[key].properties.message}${wrongColumn}`);
      }
    }
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