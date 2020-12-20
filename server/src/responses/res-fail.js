const errorsmessage = require('../config/errorsmessage');

module.exports = (code = 0, detail = 'No detail') => {
  const message_id = 'err' + code;
  return {
    status: 'error',
    data: {
      error_message: {
        message: errorsmessage[message_id],
        error_code: code,
        detail: detail
      }
    }
  };
};
