const genereteId = require('../utils/genereteId');
const connection = require('../database/connection');

module.exports = {
    async index(req,res){
        const users = await connection('user').select('*');
        return res.json(users)
    },
    async create(req,res){
        const {name,email,password} = req.body;
        const authorization = genereteId();
        const scorre = 1000;

        await connection('user').insert({
            name,
            email,
            password,
            scorre,
            authorization
        });

        return res.json({authorization});
    }
}