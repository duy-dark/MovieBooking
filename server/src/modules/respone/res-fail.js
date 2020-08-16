import errorsmessage from '../../config/errorsmessage';

module.exports = (code = 0) => {
  return {
    status: 'error',
    data: {
      error_message: {
        message: errorsmessage.code,
        error_code: code
      }
    }
  };
};
