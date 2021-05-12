require('dotenv').config();
const express = require('express');
const cors = require('cors');
const {errors} = require('celebrate');
const routes = require('./src/routes');
const { init,disconnect } = require('./src/game/controllers/UserController');

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
    })
})

http.listen(process.env.PORT);