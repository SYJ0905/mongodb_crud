const headers = {
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'PATCH, POST, GET, OPTIONS, DELETE',
  'Content-Type': 'application/json',
};

const message = {
  404: '無此網站路由',
  wrongColumn: '欄位未填寫正確',
  noData: '無此資料',
  formatFail: '格式錯誤',
};

const fieldKeyExist = (model, data, fieldValidate = true) => {
  /** 檢查物件內 key 值是否存在 schema 的 key 值當中 start */
  const schemaData = model.prototype.schema.obj;
  const schemaKey = [];

  Object.keys(schemaData).forEach((item) => {
    if (schemaData[item].required && schemaData[item].required.indexOf(true) > -1) {
      schemaKey.push(item);
    }
  });

  const returnValue = Object.keys(data).every((item) => {
    if (fieldValidate) {
      if (schemaKey.indexOf(item) === -1) {
        return false;
      }
    }
    return true;
  });
  return returnValue;
  /** 檢查物件內 key 值是否存在 schema 的 key 值當中 end */
};

module.exports = {
  headers,
  message,
  fieldKeyExist,
};
