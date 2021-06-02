const crytpo = require('crypto');

const { findPrivate, insert, privateCreate } = require("../data/Rooms");
const genereteCodeRoom = require('../utils/genereteCodeRoom');
const genereteFenCode = require("../utils/genereteFenCode");

module.exports = {
    private(id,name,scorre,codeRoom){

        const coderoom = genereteCodeRoom();
        const room = crytpo.randomBytes(4).toString('HEX');
        const code = genereteFenCode();

        const PlayersData = {
            count:1,
            room,
            code,
            coderoom,
            players:[]
        }

        if(codeRoom){
            const SinglePlayer = findPrivate(codeRoom);
            
            privateCreate(id,name,scorre,SinglePlayer.room,SinglePlayer.code,2,codeRoom)
            insert(SinglePlayer.id,2);

            PlayersData.count = 2;
            PlayersData.room = SinglePlayer.room;
            PlayersData.code = SinglePlayer.code;
            PlayersData.coderoom = SinglePlayer.codeRoom;

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
            PlayersData.players.push({
                name,
                scorre
            })
            privateCreate(id,name,scorre,room,code,1,coderoom);
        }

        return PlayersData;
    },
    validateRoom(codeRoom){
        const SinglePlayer = findPrivate(codeRoom);

        if(SinglePlayer && SinglePlayer.players == 1){
            return true
        }else{
            return false
        }
    
    }
}