const connection = require('../database/connection')

module.exports = {
    async index(req,res){
        const userId = req.headers.authorization;
        const dataUser = await connection('user').where('authorization',userId).select('*');

        return res.json(dataUser);
    }
}