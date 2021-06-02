module.exports = function genereteCodeRoom(){

    const result = [];
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

    const AlfhaLenght = characters.length;

    for (let i = 0; i < 5; i++) {
        result.push(characters.charAt(Math.floor(Math.random() * AlfhaLenght)));
    }

    return result.join('')
}