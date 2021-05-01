const crypto = require('crypto');

module.exports = function genereteId(){
    return crypto.randomBytes(8).toString('hex');
}