const mongoose = require('mongoose');

let schema = new mongoose.Schema(
  {
    idUser:String,
    nameOfMovie: String,
    date: String,
    seatDetail: String,//Room - Seat
    Theater:String,
    Money: String
  },

);

let Collection = mongoose.model('TicketPurchaseHistory', schema, 'TicketPH');

module.exports = {
  findByLambda: async function (lambda) {
    return await Collection.find(lambda.conditions, lambda.views);
  },
  createByLambda: async function (lambda) {
    return await Collection.insertMany(lambda);
  },
 
};
