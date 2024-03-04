const fs = require("node:fs");

// console.log('program starts');
// fs.writeFileSync("./file1.txt","Hello Everyone!");
// console.log('program continues');

// console.log('writing a file in a write asynchrnous mode');
// const content = "Hi Everyone, how are you?";
// //writeFile overwrites the content
// fs.writeFile("./file1.txt",content,(err)=>{

//     if(err)
//     {
//         console.log(err);
//     }
//     else {
//         console.log("file written");
//     }
// });

// console.log('program continues');
//append mode appends the text to existing content
console.log('file writing in async mode in append mode');
fs.writeFile("./file1.txt"," Welcome to Nodejs training!",{flag:"a"},(err)=>{

    if(err)
    {
        console.log(err);
    }
    else {
        console.log("file appended");
    }
});
console.log('remaining program continues');