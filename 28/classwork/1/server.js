process.argv[2] = 5;
process.argv[3] = 10;
var args = process.argv.slice(2);

console.log(args);

var isAllArgsNums = args.every((arg) => {
    return !isNaN(+arg);
});

var sum = isAllArgsNums ? 0 : '';

args.forEach((arg) => {
    sum += (isAllArgsNums ? +arg : arg);
});

console.log(sum);