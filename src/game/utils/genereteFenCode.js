const randomNum = require('./randomNum');

module.exports = function genereteFenCode(){
    const colun = randomNum(4,7);
    let validate = 6 - colun;

    let fen_code = '8/'

    for (let index = 0; index < colun; index++) {
        let line = randomNum(4,9);
        let rest = 8 - line
        for (let index = 0; index < line; index++) {
            fen_code += 'P'
        }

        if(rest === 0){
            fen_code += '/'
        }else{
            fen_code += `${rest}/`
        }
    }
    if(validate === 0){
        fen_code += '8 w -- 0 0'
    }else{
        for (let index = 0; index < validate; index++) {
            fen_code += '8/'
        }
        fen_code += '8 w -- 0 0'
    }
    return fen_code;
}