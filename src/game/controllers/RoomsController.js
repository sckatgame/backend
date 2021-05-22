const crytpo = require('crypto');
const { findRoom, create, insert, deleteData, update, showRoom, over } = require('../data/Rooms');
const genereteFenCode = require('../utils/genereteFenCode');

module.exports = {
    index(id,name,scorre){
        const SinglePlayer = findRoom(id);

        let room = crytpo.randomBytes(4).toString('HEX');
        let code = genereteFenCode();

        const PlayersData = {
            count:1,
            room:'',
            code,
            players:[]
        }

        if(SinglePlayer){
            create(id,name,scorre,SinglePlayer.room,SinglePlayer.code,2)
            insert(SinglePlayer.id,2);
            
            PlayersData.count = 2;
            PlayersData.room = SinglePlayer.room;
            PlayersData.code = SinglePlayer.code;

            PlayersData.players.push({
                name,
                scorre,
                vez:0
            })

            PlayersData.players.push({
                name:SinglePlayer.name,
                scorre:SinglePlayer.scorre,
                vez:SinglePlayer.vez
            })


        }else{
            PlayersData.count = 1;
            PlayersData.room = room;
            
            PlayersData.players.push({
                name,
                scorre
            })

            create(id,name,scorre,room,code,1);
        }

        return PlayersData;
    },

    async updateData(id,code){

        const data = await update(id,code);
        
        data.room = showRoom(id)

        return data
    },

    async gameOver(id){
        const data = await over(id);

        return data;
    },

    dropUser(id){
        return deleteData(id);
    }
}