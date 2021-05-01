require('dotenv').config();
const genereteId = require('../utils/genereteId');
const genereteCode = require('../utils/genereteCode');
const connection = require('../database/connection');
const SendMail = require('../services/SendMail');

module.exports = {
    async index(req,res){
        const {email,password} = req.body;
        const users = await connection('user').select('*');
        
        if(email == process.env.SMTP_USER && password == process.env.SMTP_PASS) return res.json(users)

        return res.status(400).json({acess:'denied'})
    },
    async create(req,res){
        const {name,email,password} = req.body;
        const authorization = genereteId();
        const code = genereteCode()
        const scorre = 1000;
        
        const validateOptions = await connection('user')
        .where({email})
        .select('code')
        .first();

        if(validateOptions){
            if(validateOptions.code == 'validate'){
                return res.status(400).json({error:'Este email já existe'});
            }
            return res.status(200).json();
        }

        await connection('user').insert({
            name,
            email,
            password,
            code,
            scorre,
            authorization
        });

        await SendMail(
            email,
            code,
            'Seu código de validação',
            'Código de validação'
        );

        return res.json({warn:'Validação pendente'});
    },

    async validateEmail(req,res){
        const {code,email} = req.body;

        const origem_code = await connection('user')
        .where({email})
        .select('code','authorization')
        .first();

        if(code == origem_code.code){
            await connection('user').where({email}).update({code:'validate'})

            return res.json({'authorization':[origem_code.authorization]})
        }

        res.status(400).json({error:'Código errado'});

    },

    async validatePassword(req,res){
        const {email} = req.body;

        const user = await connection('user')
        .where({email})
        .select('password')
        .first();

        if(!user){
            return res.status(400).json({err:'Usuário não existe'})
        }

        await SendMail(
            email,
            user.password,
            'Sua senha',
            'Recuperção de senha'
        );

        return res.json({sucess:'Enviamos sua senha por email'})

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