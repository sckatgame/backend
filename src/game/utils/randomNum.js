module.exports = function randomNum(min, max) {
    return parseInt(Math.random() * (max - min) + min);
}