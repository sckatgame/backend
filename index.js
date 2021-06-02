require('dotenv').config();
const express = require('express');
const cors = require('cors');
const {errors} = require('celebrate');
const routes = require('./src/routes');
const { init,disconnect } = require('./src/game/controllers/UserController');
const { index, dropUser, updateData, gameOver } = require('./src/game/controllers/RoomsController');
const { private, validateRoom } = require('./src/game/controllers/PrivatesRoomsControllers');

const app = express();

app.use(errors());
app.use(cors());
app.use(express.json());
app.use(routes);

const http = require('http').createServer(app);
const io = require('socket.io')(http);

io.on('connection',socket =>{
    
    socket.on('init', async (name,scorre) =>{
        const data = await init(socket.id,name,scorre)
        socket.emit('init',data)
        socket.broadcast.emit('update',data)
    })

    socket.on('disconnect', async () =>{
        const data = await disconnect(socket.id)
        socket.broadcast.emit('update',data)

        const room = dropUser(socket.id);
        io.in(room).emit('over');
    })

    socket.on('start', (name,scorre) =>{
        const user = index(socket.id,name,scorre);
        socket.join(user.room);
        io.in(user.room).emit('data', user)
    })
    
    socket.on('updateRoom', async (code) =>{
        const data = await updateData(socket.id,code);
        io.in(data.room).emit('updateRoom', data);
    })

    socket.on('over', async () =>{
        const data = await gameOver(socket.id);
        io.in(data.room).emit('over', data);
    })

    socket.on('private', (name,scorre,codeRoom) =>{
        const user = private(socket.id,name,scorre,codeRoom);
        socket.join(user.room);
        io.in(user.room).emit('privateData', user);
    })

    socket.on('seachRoom', (codeRoom) =>{
        const resolve = validateRoom(codeRoom);
        socket.emit('resolve',resolve);
    })

})

http.listen(process.env.PORT);