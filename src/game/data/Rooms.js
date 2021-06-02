const genereteFenCode = require('../utils/genereteFenCode');
const UpdateUser = require('./UpdateUser');

const rooms = []

module.exports = {
    create(id,name,scorre,room,code,players){
        return rooms.push({
            id,
            name,
            scorre,
            room,
            code,
            round:1,
            vez:0,
            rule:0,
            victores:0,
            players,
            persitence:code
        })
    },

    privateCreate(id,name,scorre,room,code,players,codeRoom){
        return rooms.push({
            id,
            name,
            scorre,
            room,
            code,
            round:1,
            vez:0,
            rule:0,
            victores:0,
            players,
            persitence:code,
            codeRoom
        })
    },
    
    insert(id){
        return rooms.map(
            (e,i) =>{
                if(e.id == id){
                    rooms[i].players = 2;
                    rooms[i].vez = 1;
                }
            }
        );
    },

    findRoom(id){
        const data = rooms.find(e => e.players == 1 && !e.codeRoom);
        return data;
    },

    findPrivate(code){
        const data = rooms.find(e => e.codeRoom == code)
        return data
    },

    deleteData(id){
        const data = rooms.find(e => e.id == id);

        if(!data){
            return;
        }

        const {room} = rooms.find(e => e.id == id);
        
        for(let i = 0; i < 2; i++){
            rooms.map(
                (e,i) =>{
                    if(e.room == room){
                        rooms.splice(i,1);
                    }
                }
            )
        }
        
        return room
    },

    async update(id,code){

        const {room,round,rule} = rooms.find(e => e.id == id)
        const validate = code.split("").filter(e => e == 'P');

        if(validate.length === 1){
            if(round === 2){

                let dataPlaye2 = {}
                let dataPlaye1 = {}

                rooms.map(
                    (e,i) =>{
                        if(e.room == room){
                            if(e.id == id){
                                rooms[i].victores += 1
                                rooms[i].vez = 0
                                dataPlaye1.vez = 0
                                dataPlaye1.id = id
                                dataPlaye1.name = e.name;
                                dataPlaye1.scorre = e.scorre;
                            }else{
                                rooms[i].vez = 1
                                dataPlaye2.id = e.id
                                dataPlaye2.vez = 1
                                dataPlaye2.name = e.name;
                                dataPlaye2.scorre = e.scorre;
                            }
                        }
                    }
                )

                const data = rooms.filter(e => e.room == room);

                if(data[0].victores == data[1].victores){
                    const newRound = parseInt(Math.random() * (3 - 1) + 1);
                    const TwoCode = genereteFenCode();

                    rooms.map(
                        (e,i) =>{
                            if(e.room == room){
                                rooms[i].code = TwoCode;
                                rooms[i].round = 3;
                                rooms[i].rule = newRound;
                            }
                        }
                    )
                    
                    return {
                        name:dataPlaye1.name,
                        round:3,
                        rule:newRound,
                        code:TwoCode,
                        data:[dataPlaye1,dataPlaye2]
                    };

                }

                await UpdateUser(dataPlaye1,dataPlaye2)

                return {
                    name:dataPlaye1.name
                }

            }

            if(rule === 2){
                const player1 = rooms.filter(e => e.room == room).find(e => e.id == id);
                const player2 = rooms.filter(e => e.room == room).find(e => e.id != id);
                await UpdateUser(player1,player2)
                
                return {
                    name:player1.name
                };
            }
        }


        if(validate.length == 0){
            const TwoCode = genereteFenCode();
            
            switch (round) {
                case 2:
                    let dataPlaye2 = {}
                    let dataPlaye1 = {}
                    rooms.map(
                        (e,i) =>{
                            if(e.room == room){
                                if(e.id != id){
                                    rooms[i].victores += 1
                                    rooms[i].vez = 1
                                    dataPlaye1.vez = 1
                                    dataPlaye1.id = e.id
                                    dataPlaye1.name = e.name;
                                    dataPlaye1.scorre = e.scorre;
                                }
                                if(e.id == id){
                                    rooms[i].vez = 0
                                    dataPlaye2.id = id
                                    dataPlaye2.vez = 0
                                    dataPlaye2.name = e.name;
                                    dataPlaye2.scorre = e.scorre;
                                }
                            }
                        }
                    )

                    const data = rooms.filter(e => e.room == room);

                    if(data[0].victores == data[1].victores){

                        const newRound = parseInt(Math.random() * (3 - 1) + 1);

                        rooms.map(
                            (e,i) =>{
                                if(e.room == room){
                                    rooms[i].code = TwoCode;
                                    rooms[i].round = 3;
                                    rooms[i].rule = newRound;
                                }
                            }
                        )

                        return {
                            name:dataPlaye1.name,
                            round:3,
                            rule:newRound,
                            code:TwoCode,
                            data:[dataPlaye1,dataPlaye2]
                        };
                    }

                    await UpdateUser(dataPlaye1,dataPlaye2)

                    return {
                        name:dataPlaye1.name
                    }
                    
                case 3:
                    const {rule} = rooms.find(e => e.room == room);

                    
                    if(rule == 1){
                        const player1 = rooms.filter(e => e.room == room).find(e => e.id == id);
                        const player2 = rooms.filter(e => e.room == room).find(e => e.id != id);
                        
                        await UpdateUser(player1,player2)

                        return {
                            name:player1.name
                        };
                    }else{
                        const player1 = rooms.filter(e => e.room == room).find(e => e.id != id);
                        const player2 = rooms.filter(e => e.room == room).find(e => e.id == id);
                        
                        await UpdateUser(player1,player2)

                        return {
                            name:player1.name
                        };
                    }
                default:

                    const player1Time = {};
                    const player2Time = {};

                    let code_persitence = '';

                    rooms.map(
                        (e,i) =>{
                            if(e.room == room){
                                rooms[i].code = e.persitence;
                                rooms[i].round = 2
                                code_persitence = e.persitence;
                                if(e.id == id){
                                    rooms[i].victores += 1
                                    rooms[i].vez = 0
                                    player1Time.id = id
                                    player1Time.vez = 0
                                }else{
                                    rooms[i].vez = 1
                                    player2Time.id = e.id
                                    player2Time.vez = 1
                                }
                            }
                        }
                    )

                    const {name} = rooms.find(e => e.id == id)

                    return {
                        name,
                        round:2,
                        code:code_persitence,
                        data:[player1Time,player2Time]
                    }
            }
        }

        const player1Time = {};
        const player2Time = {};

        rooms.map(
            (e,i) =>{
                if(e.room == room){
                    rooms[i].code = code
                    if(e.id == id){
                        rooms[i].vez = 0
                        player1Time.id = id
                        player1Time.vez = 0
                    }else{
                        rooms[i].vez = 1
                        player2Time.id = e.id
                        player2Time.vez = 1
                    }
                }
            }
        );

        return {
            code,
            data:[player1Time,player2Time]
        }
    },

    async over(id){

        const {room} = rooms.find(e => e.id == id);

        const player1Time = {};
        const player2Time = {};

        rooms.map(
            (e,i) =>{
                if(e.room == room){
                    if(e.id == id){
                        player2Time.name = e.name;
                        player2Time.scorre = e.scorre;
                    }else{
                        player1Time.name = e.name;
                        player1Time.scorre = e.scorre;
                    }
                } 
            }
        )

        await UpdateUser(player1Time,player2Time)

        return {
            ...player1Time,
            room
        };

    },

    showRoom(id){
        const {room} = rooms.find(e => e.id == id)
        return room
    },

    show(){
        return rooms;
    }
}