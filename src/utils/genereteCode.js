const crypto = require('crypto');

module.exports = function genereteCode(){
    return crypto.randomInt(1000,9999);
}