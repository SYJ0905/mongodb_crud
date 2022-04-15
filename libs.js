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

module.exports = {
  headers,
  message,
};