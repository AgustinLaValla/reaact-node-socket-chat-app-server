const { getUser, removeUser, addUser, getUsersInRoom } = require('../helpers/user');

const socketStreams = (io) => {

    io.on('connect', (client) => {

        client.on('join', ({ name, room }, callback) => {

            const { error, user } = addUser({ id: client.id, name, room });

            if (error) return callback(error);

            client.join(user.room);

            client.emit('message', { user: 'admin', text: `${user.name}, welcome to the room: ${user.room}` });

            client.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} jas joined` });

            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

            callback();

        });

        client.on('sendMessage', (message, callback) => {
            const user = getUser(client.id);
            io.to(user.room).emit('message', { user: user.name, text: message });
            callback();
        });


        client.on('disconnect', () => {
            const user = removeUser(client.id);
            if (user) {
                io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left.` });
                io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
            }
        });
    });



}

module.exports = { socketStreams };