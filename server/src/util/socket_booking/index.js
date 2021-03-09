const NotificationModel = require('../../modules/notifications/model');
var cron = require('node-cron');

let socketCustomer = {};

const connection = (socket, io) => {
  console.log('connection by ' + socket.id);

  if (!(socket.id in socketCustomer)) {
    socketCustomer[socket.id] = {};
  }

  socket.on('get_notifications', async (customer_id) => {
    if (!(customer_id in socketCustomer[socket.id])) {
      socketCustomer[socket.id][customer_id] = customer_id;
    }

    console.log('socket.id :', socket.id);
    console.log('socket_id info :', socketCustomer[socket.id][customer_id]);

    let task = cron.schedule('*/10 * * * * *', async () => {
      console.log('running a task every 10 seconds');

      if (socketCustomer[socket.id] === undefined) {
        task.destroy();
      } else {
        let conditions = {
          customer_id: require('mongodb').ObjectId(
            socketCustomer[socket.id][customer_id]
          ),
          is_sent: false,
          is_deleted: false
        };
        let notifications = await NotificationModel.getByCustomerID({
          conditions
        });

        console.log('notifications', notifications);
        if (notifications.length > 0) {
          let update = await NotificationModel.updateManyByLambda({
            conditions: {
              customer_id: require('mongodb').ObjectId(
                socketCustomer[socket.id][customer_id]
              ),
              is_sent: false,
              is_deleted: false
            },
            params: {is_sent: true}
          });
          socket.emit('revice_data', notifications);
        }
      }
    });
  });

  socket.on('disconnect', () => {
    console.log(socket.id + ' disconnect socket');
    delete socketCustomer[socket.id];
  });
};

module.exports = connection;
