const fs = require("node:fs");
console.log('second - async read-write');
fs.readFile("./file.txt","utf-8",(err,data)=>{

    if(err)
    {
        console.log(err);
    }
    else {
        console.log(data);
    }
});
console.log('third'); //non blocking call
console.log('program continues as readfile is in async mode');