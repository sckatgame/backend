const connection = require('../database/connection')

module.exports = {
    async create(req,res){
        const {email,password} = await req.body;

        const user = await connection('user')
        .where({email,password})
        .select('authorization','code')
        .first();

        if(!user){
            return res.status(400).json({error:"Usuário não encontrado"})
        }

        if(user.code != 'validate'){
            await connection('user').where('email',email).delete();
            return res.status(400).json({error:"Usuário não encontrado"})   
        }

        const {authorization} = user;

        return res.json({authorization})
    }
}