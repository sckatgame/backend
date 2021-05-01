const connection = require('../database/connection')

module.exports = {
    async create(req,res){
        const {email,password} = await req.body;

        const user = await connection('user')
        .where({email,password})
        .select('authorization')
        .first();

        if(!user){
            return res.status(400).json({error:"Usuário não encontrado"})
        }

        return res.json(user)
    }
}