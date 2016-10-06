function Counter(count) {
    return this.count = count;

}
module.exports = function (count) {
    return new Counter(count);
};