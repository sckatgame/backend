const connection = require("../../database/connection")

module.exports = async function UpdateUser(player1,player2){

    if(player1.scorre != 'Convidado' && player2.scorre == 'Convidado'){
        const newScorre = parseInt(player1.scorre) + 10;

        await connection('user')
        .where({ name: player1.name })
        .update({ scorre: newScorre })

        return;
    }

    if(player1.scorre == 'Convidado' && player2.scorre != 'Convidado'){
        const newScorre = parseInt(player2.scorre) - 10;

        if(newScorre < 0){
            await connection('user')
            .where({ name: player2.name })
            .update({ scorre: 0})
        }else{
            await connection('user')
            .where({ name: player2.name })
            .update({ scorre: newScorre })
        }

        return;
    }

    if(player1.scorre != 'Convidado' && player2.scorre != 'Convidado'){
        
        const scorreP2 = parseInt(player2.scorre) - 10;

        if(scorreP2 < 0){
            await connection('user')
            .where({ name: player2.name })
            .update({ scorre: 0 })
        }else{
            await connection('user')
            .where({ name: player2.name })
            .update({ scorre: scorreP2 })
        }
        
        if(parseInt(player1.scorre) < parseInt(player2.scorre)){

            const scorreP1 = parseInt(player1.scorre) + (Math.round((player2.scorre - player1.scorre)/100) + 10)

            await connection('user')
            .where({ name: player1.name })
            .update({ scorre: scorreP1 })
        }else{
            const newScorre = parseInt(player1.scorre) + 10;
            
            await connection('user')
            .where({ name: player1.name })
            .update({ scorre: newScorre })
        }
    }
}