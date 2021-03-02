const userRepo = require('../modules/users-old/model');
const roomRepo = require('../modules/rooms/model');
const messageRepo = require('../modules/messages/model');
const gameRepo = require('../modules/games/model');
const turnRepo = require('../modules/turns/model');
const {updateUserSocket} = require('../modules/rooms/handler');

const connection = (socket, io) => {
  console.log('connection by ' + socket.id);

  socket.on('status-onl', async (user) => {
    try {
      //Update status for user by id
      await userRepo.updateStatusLogin(user.id);
      io.emit('res-status-onl', {id: user.id});
    } catch (error) {}
  });

  socket.on('status-off', async (user) => {
    try {
      //Update status for user by id
      await userRepo.updateStatusLogin(user.id);
      io.emit('res-status-off', {id: user.id});
    } catch (error) {}
  });

  socket.on('logout', async (user) => {
    try {
      //Update status for user by id
      await userRepo.updateStatusLogout(user.id);
      io.emit('res-logout', {id: user.id});
    } catch (error) {}
  });

  socket.on('room-change-status', async ({room}) => {
    // console.log("room-change-status ", room)
    let customRoom = {...room};
    customRoom.userPlayer1 = room.userPlayer1.id;
    customRoom.userPlayer2 = null;
    await roomRepo.update(customRoom);
  });

  socket.on('join', async ({room, user}) => {
    socket.join(room.name);
    var arr = [];
    var rooms = socket.adapter.rooms;
    rooms.forEach((value, key, map) => {
      if (key.indexOf('room') >= 0) {
        arr.push(key);
      }
    });
    let data = await roomRepo.getRoomByName(arr);
    data.forEach((item) => {
      item.isPass = !!item.password;
    });
    io.sockets.emit('create-room', data);

    if (room.userPlayer1 !== user.id && room.userPlayer2 !== user.id) {
      io.sockets.in(room.name).emit('user-guest-add', user);
    }
  });

  socket.on('user-join-play', async (room) => {
    let roomRes = await updateUserSocket(room);
    io.sockets.in(room.name).emit('update-room', roomRes.room);
  });

  socket.on('out-room', async ({room, user}) => {
    if (room.userPlayer1 !== user.id && room.userPlayer2 !== user.id) {
      io.sockets.in(room.name).emit('user-guest-out', user);
    } else {
      let params;
      if (room.userPlayer1 === user.id) {
        params = {...room, userPlayer1: null};
      } else {
        params = {...room, userPlayer2: null};
      }
      socket.leave(room.name);
      await roomRepo.update(room);
      io.sockets.in(room.name).emit('update-room', room);
    }
  });

  socket.on('socket-game', async ({game, room}) => {
    let data = await gameRepo.create(game);
    game.id = data.insertId;
    io.sockets.in(room.name).emit('socket-game-room', game);
  });

  socket.on('set-turn-game', async (turn) => {
    let data = turnRepo.create(turn);
    turn.id = data.insertId;
    io.sockets.in(turn.roomName).emit('update-turn', turn);
  });

  socket.on('user-chat', async (message) => {
    let data = await messageRepo.create(message);
    message.id = data.insertId;
    io.sockets.in(message.room).emit('send-message', message);
  });

  socket.on('event-surender', async ({room, user}) => {
    io.sockets.in(room.name).emit('alert-surender', user);
  });

  socket.on('alert-surender-res', async ({status, user}) => {
    io.sockets.in(room.name).emit('alert-surender-respone', {status, user});
  });

  // socket.on("join-room-fast", async(room) => {
  //   let arr = [room.name]
  //   let data = await roomRepo.getRoomByName(arr)
  //   socket.emit()
  // })

  socket.on('disconnect', () => {
    console.log(socket.id + ' disconnect socket');
  });
};

module.exports = connection;
