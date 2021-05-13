const connection = require('../database/connection')

module.exports = {
    async create(req,res){
        const {email,password} = await req.body;

        const user = await connection('user')
        .where({email})
        .select('authorization','code','password')
        .first();

        if(!user){
            return res.status(400).json({error:"Usuário não encontrado"})
        }

        if(user.code != 'validate'){
            await connection('user').where({email,password}).delete();
            return res.status(400).json({error:"Usuário não encontrado"})
        }

        if(password != user.password){
            return res.status(400).json({error:"Senha Incorreta"})
        }

        return res.json({authorization:user.authorization})
    }
}