const Notification = require('../../modules/notifications/handler');

let seatsOfRooms = {};
let roomOfClient = {};

const arraySeats = (Room) => {
  let array = [];
  for (const key in Room) {
    if (Object.hasOwnProperty.call(Room, key)) {
      array = array.concat(Room[key]);
    }
  }
  return array;
};

const connection = (socket, io) => {
  console.log('connection by ' + socket.id);

  socket.on('get_notifications', async (user_id) => {
    console.log('socket_id info :', socket.id, user_id);
  });

  socket.on('john_room', async (room) => {
    console.log('room socketid', socket.id);
    console.log('room socketid', socket.id);

    if (!(room.name in seatsOfRooms)) {
      seatsOfRooms[room.name] = {};
    }
    if (!(socket.id in seatsOfRooms[room.name])) {
      seatsOfRooms[room.name][socket.id] = [];
      roomOfClient[socket.id] = room.name;
    }
    await socket.join(room.name);

    console.log('luc moi vao seats_existed:');
    io.in(room.name).emit('seats_existed', arraySeats(seatsOfRooms[room.name]));
  });

  socket.on('sellect_seat', async (room, seats) => {
    seatsOfRooms[room.name][socket.id] = seats;

    console.log('seats_existed:', arraySeats(seatsOfRooms[room.name]));
    io.in(room.name).emit('seats_existed', arraySeats(seatsOfRooms[room.name]));
  });

  socket.on('disconnect', () => {
    console.log(socket.id + ' disconnect socket');
    let room_name = roomOfClient[socket.id];

    console.log('seatsOfRooms[room_name]', seatsOfRooms[room_name]);
    if (seatsOfRooms[room_name]) {
      delete seatsOfRooms[room_name][socket.id];
    }
    delete roomOfClient[socket.id];
    console.log('seatsOfRooms[room_name]', arraySeats(seatsOfRooms[room_name]));
    io.in(room_name).emit('seats_existed', arraySeats(seatsOfRooms[room_name]));
  });
};

module.exports = connection;
