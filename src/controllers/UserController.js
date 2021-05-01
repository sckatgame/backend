require('dotenv').config();
const genereteId = require('../utils/genereteId');
const connection = require('../database/connection');

module.exports = {
    async index(req,res){
        const {email,password} = req.body;
        const users = await connection('user').select('*');
        
        if(email == process.env.SMTP_USER && password == process.env.SMTP_PASS) return res.json(users)

        return res.status(400).send({acess:'denied'})
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
    },

    async update(req,res){
        const {name,password,authorization} = req.body;

        const userUpdate = await connection('user').where({authorization}).update({
            name,
            password
        })

        if(!userUpdate) return res.status(400).json('Falha ao atulizar os dados')

        return res.status(200).json()

    }
}