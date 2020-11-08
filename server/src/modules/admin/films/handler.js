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
        name: req.body.name || undefined,
        content: req.body.content || undefined,
        countries: req.body.countries || undefined,
        long_time: req.body.long_time || undefined,
        start_date: req.body.start_date || undefined,
        directors: req.body.directors || undefined,
        rates: req.body.rates || undefined,
        rate_count: req.body.rate_count || undefined,
        actors: req.body.actors || undefined,
        digitals: req.body.digitals || undefined,
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
        name: req.body.name || undefined,
        content: req.body.content || undefined,
        countries: req.body.countries || undefined,
        long_time: req.body.long_time || undefined,
        start_date: req.body.start_date || undefined,
        directors: req.body.directors || undefined,
        rates: req.body.rates || undefined,
        rate_count: req.body.rate_count || undefined,
        actors: req.body.actors || undefined,
        digitals: req.body.digitals || undefined,
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
