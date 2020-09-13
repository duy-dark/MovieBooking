var Film = require('../../models/film.model');
const resSuccess = require('./../../response/res-success');
const {omitBy, isNil} = require('lodash');

module.exports = {
  listFilm: async function (req, res) {
    var films = await Film.findByLambda();
    res.json(films);
  },

  findById: async function (req, res) {
    var id = req.params.id;
    var films = await Film.findByLambda({_id: id});
    res.json(films[0]);
  },

  postCreate: async function (req, res, next) {
    var entity = {
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
      updated_at: req.body.updated_at || ''
    };
    await Film.createByLambda(entity)
      .then(() => {
        res.json(resSuccess({data: 'Create film successfully'}));
      })
      .catch((err) => {
        res.send('Create film failed');
      });
  },

  patchUpdate: async function (req, res, next) {
    var id = req.params.id;
    var entity = {
      name: req.body.name || '',
      content: req.body.content || '',
      countries: req.body.countries || '',
      long_time: req.body.long_time || '',
      start_date: req.body.start_date || '',
      directors: req.body.directors || '',
      rates: req.body.rates || '',
      rate_count: req.body.rate_count || '',
      actors: req.body.actors || '',
      digitals: req.body.digitals || ''
      // updated_at: req.body.updated_at || '' current time
    };

    var result = omitBy(entity, isNil);

    await Film.updateByLambda({_id: id}, result)
      .then(() => {
        res.json(resSuccess({data: 'Update film successfully'}));
      })
      .catch((err) => {
        res.send('Update film failed');
      });
  },

  delete: async function (req, res) {
    var id = req.params.id;
    var entity = {
      isDeleted: true
    };
    await Film.updateByLambda({_id: id}, entity)
      .then(() => {
        res.json(resSuccess({data: 'Delete film successfully'}));
      })
      .catch((err) => {
        res.send('Delete film failed');
      });
  }
};
