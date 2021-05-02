const connection = require('../database/connection')

module.exports = {
    async index(req,res){
        const userId = req.headers.authorization;
        const dataUser = await connection('user').where('authorization',userId).select('*');

        const topfive = await connection('user')
        .select('name','scorre')
        .orderBy('scorre','desc')
        .limit(5)

        return res.json({dataUser,topfive});
    }
}