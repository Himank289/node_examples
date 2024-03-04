const fs = require("node:fs");

console.log('first - sync read-write');
const readContent = fs.readFileSync("./file.txt","utf-8");
console.log(readContent);
console.log("continue");
