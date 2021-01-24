const express = require('express');
const { values } = require('lodash');
const validated = require('../users/validated');
const router = express.Router();
const handler = require('./handler');
const validate = require('./validated');
const resSuccess = require('./../../response/res-success');
//const {validationResult} = require('express-validator');
const {body, validationResult} = require('express-validator');
const moment = require('moment-timezone');
const theater = require('../../models/theater.model');

const { validateCreateFilm } = require('./validated');

router.post('/create', validateCreateFilm(), async (req, res, next) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            throw {
            status: 402,
            errCode: 1,
            detail: errors.array()
            };
        }
        let startDate = req.body.start_date
        let time_start = req.body.time_start
        let time_end = req.body.time_end


        let temp1 = moment(time_start,"DD/MM/YYYY HH:mm:ss").diff(moment(startDate,"DD/MM/YYYY HH:mm:ss"));
        let temp2 = moment(time_end,"DD/MM/YYYY HH:mm:ss").diff(moment(startDate,"DD/MM/YYYY HH:mm:ss"));
        let temp3 = moment(time_end,"DD/MM/YYYY HH:mm:ss").diff(moment(time_start,"DD/MM/YYYY HH:mm:ss"));

        let theater_id = req.body.theater_id;
        let temp = await theater.findByIdLambda(theater_id);

        if (temp1 <= 0 || temp2 <= 0 || temp3 <= 0 || temp == 0){
        throw {
            status: 402,
            errCode: 1,
            detail: 'check again Start, begin, end_time, theater_ID',
            };
        }
        else {           
            films = await handler.createFilm(req.body)
        }
        res.json(resSuccess({film: films}))
        
    } catch (error) {
        next(error)
    }
    
});
module.exports = router;
