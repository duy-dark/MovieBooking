var mongoose = require('mongoose');

var film_commentSchema = new mongoose.Schema(
  {
    film_id: String,
    customer_id: String,
    content: String,
    stars: int32,
    is_deleted: Boolean,
    updated_at: Date
  },
  {versionKey: false}
);

var Film_comment = mongoose.model(
  'Film_comment',
  film_commentSchema,
  'film_comments'
);

module.exports = {
  findByLamda: async function (lamda) {
    var film_comments = await Film_comment.find(lamda);
    return film_comments;
  },
  createByLamda: async function (lamda) {
    return await Film_comment.insertMany(lamda);
  },
  updateByLamda: async function (id, lamda) {
    return await Film_comment.updateOne(id, lamda);
  },
  deleteByLamda: async function (lamda) {
    return await Film_comment.deleteOne(lamda);
  }
};
