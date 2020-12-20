const {body, check} = require('express-validator');
const bodyparser = require('body-parser');
const moment = require('moment-timezone');


const validateCreateFilm = () => {
  return [
    check('start_date', 'Start_date is date type').not().isEmpty(),
    check('time_start', 'Time_start is date type').not().isEmpty(),
    check('time_end', 'Time_end is date type').not().isEmpty(),
    //check('theater_id', 'Theater_id does not empty is string').not().isEmpty().isString()
  ];
};

module.exports = {
  validateCreateFilm
};
