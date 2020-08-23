var mongoose = require('mongoose');

var tokens = new mongoose.Schema(
  {
    user_id: String,
    token: String,
    expires_in: int64 
  },
  {versionKey: false}
);

var Tokens = mongoose.model('Tokens', ticketSchema, 'tokens');

module.exports = {
  findByLamda: async function (lamda) {
    var Tokens = await Tokens.find(lamda);
    return Tokens;
  },
  createByLamda: async function (lamda) {
    return await Tokens.insertMany(lamda);
  },
  updateByLamda: async function (id, lamda) {
    return await Tokens.updateOne(id, lamda);
  },
  deleteByLamda: async function (lamda) {
    return await Tokens.deleteOne(lamda);
  }
};