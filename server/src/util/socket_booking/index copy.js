const Notification = require('../../modules/notifications/handler');
const TicketModel = require('../../modules/tickets/model');
let seatsOfRooms = {};
let roomOfClient = {};

const arraySeats = (Room) => {
  console.log('ROom:', Room);
  let array = [];
  for (const key in Room) {
    if (Object.hasOwnProperty.call(Room, key)) {
      array = array.concat(Room[key]);
    }
  }

  console.log('arraySeats: ', arraySeats);

  return array;
};

const seatExisted = async (film_schedule_id) => {
  console.log('film_schedule_id', require('mongodb').ObjectID(room.name));
  let conditions = {
    film_schedule_id: require('mongodb').ObjectID(film_schedule_id),
    is_deleted: false
  };
  let data = await TicketModel.getTicketBySchedule(conditions);
  let arr = data.map((item) => item.seats);
  console.log('arr: ', arr);
  let array = arr.concat(arraySeats(film_schedule_id));

  console.log('array: ', array);

  return array;
};

const connection = (socket, io) => {
  console.log('connection by ' + socket.id);

  socket.on('get_notifications', async (user_id) => {
    console.log('socket_id info :', socket.id, user_id);
  });

  socket.on('john_room', async (room) => {
    console.log('socketid', socket.id);
    console.log('room.name', room.name);

    if (!(room.name in seatsOfRooms)) {
      seatsOfRooms[room.name] = {};
    }
    if (!(socket.id in seatsOfRooms[room.name])) {
      seatsOfRooms[room.name][socket.id] = [];
      roomOfClient[socket.id] = room.name;
    }
    await socket.join(room.name);

    console.log('luc moi vao seats_existed:');
    io.in(room.name).emit(
      'seats_existed',
      seatExisted(seatsOfRooms[room.name])
    );
  });

  socket.on('sellect_seat', async (room, seats) => {
    seatsOfRooms[room.name][socket.id] = seats;
    console.log('socket.id', seats);
    console.log('seats_existed:', seatExisted(seatsOfRooms[room.name]));
    io.in(room.name).emit(
      'seats_existed',
      seatExisted(seatsOfRooms[room.name])
    );
  });

  socket.on('disconnect', () => {
    console.log(socket.id + ' disconnect socket');
    let room_name = roomOfClient[socket.id];

    console.log(`seatsOfRooms[${room_name}]`, seatsOfRooms[room_name]);
    if (seatsOfRooms[room_name]) {
      delete seatsOfRooms[room_name][socket.id];
    }
    delete roomOfClient[socket.id];
    console.log(
      `seatsOfRooms[${room_name}]`,
      seatExisted(seatsOfRooms[room_name])
    );
    io.in(room_name).emit('reload_seats_map', {reload: true});
    io.in(room_name).emit(
      'seats_existed',
      seatExisted(seatsOfRooms[room_name])
    );
  });
};

module.exports = connection;
