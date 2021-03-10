const connection2 = (socket, io) => {
  console.log('connection by111 ' + socket.id);

  socket.on('get_notifications', async (user_id) => {
    console.log('user_id', user_id);
  });
};

module.exports = connection2;
