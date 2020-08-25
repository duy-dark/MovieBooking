module.exports = {
  port: process.env.PORT || 1000,
  mongoURL: process.env.MONGO_URL || 'mongodb+srv://root:root@cluster0.10g9w.mongodb.net/moviebookingdb?retryWrites=true&w=majority',
  env: process.env.NODE_ENV || 'development',
  secret_key: 'moviebookingvalid',
  sk_time_life: 2678400
}