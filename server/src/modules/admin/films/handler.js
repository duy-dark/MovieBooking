let Film = require('../../models/film.model');
const resSuccess = require('./../../response/res-success');
const {omitBy, isNil} = require('lodash');
const moment = require('moment');
const {validationResult} = require('express-validator');

module.exports = {
  listFilm: async function (req, res) {
    let films = await Film.findByLambda();
    res.json(resSuccess({data: films[0]}));
  },

  findById: async function (req, res) {
    let id = req.params.id;
    let films = await Film.findByLambda({_id: id});
    res.json(resSuccess({data: films[0]}));
  },

  postCreate: async function (req, res, next) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        throw {
          status: 402,
          errCode: 1,
          detail: errors.array()
        };
      }

      let entity = {
        name: req.body.name || '',
        content: req.body.content || '',
        countries: req.body.countries || '',
        long_time: req.body.long_time || '',
        start_date: req.body.start_date || '',
        directors: req.body.directors || '',
        rates: req.body.rates || '',
        rate_count: req.body.rate_count || '',
        actors: req.body.actors || '',
        digitals: req.body.digitals || '',
        is_deleted: false,
        updated_at: moment().now()
      };
      let film = await Film.createByLambda(entity);
      res.json(resSuccess({data: film}));
    } catch (error) {
      next(error);
    }
  },

  patchUpdate: async function (req, res, next) {
    try {
      let id = req.params.id;
      let entity = {
        name: req.body.name || '',
        content: req.body.content || '',
        countries: req.body.countries || '',
        long_time: req.body.long_time || '',
        start_date: req.body.start_date || '',
        directors: req.body.directors || '',
        rates: req.body.rates || '',
        rate_count: req.body.rate_count || '',
        actors: req.body.actors || '',
        digitals: req.body.digitals || '',
        updated_at: moment().now()
      };

      let result = omitBy(entity, isNil);

      let film = await Film.updateByLambda({_id: id}, result);
      res.json(resSuccess({data: film}));
    } catch (error) {
      next(error);
    }
  },

  delete: async function (req, res) {
    try {
      let id = req.params.id;
      let entity = {
        isDeleted: true
      };
      let film = await Film.updateByLambda({_id: id}, entity);
      res.json(resSuccess({data: film}));
    } catch (error) {
      next(error);
    }
  }
};
