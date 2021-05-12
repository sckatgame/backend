const connection = require('../../database/connection');

module.exports = {
    async init(id,name,scorre){

        const isCreated = await connection('info_users')
        .where({name})
        .select('*')
        .first();

        if(!isCreated){
            await connection('info_users').insert({
                id,
                name,
                scorre
            })
        }

        const topfive = await connection('info_users')
        .select('name','scorre')
        .orderBy('scorre','desc')
        .limit(5)

        return topfive;
    },
    async disconnect(id){

        await connection('info_users').where({id}).del()

        const topfive = await connection('info_users')
        .select('name','scorre')
        .orderBy('scorre','desc')
        .limit(5)

        return topfive;
    }
}