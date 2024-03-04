const http = require('node:http');
const url = require('node:url');

let server=http.createServer((req,res)=>{
    console.log(req.url);
    console.log(req.headers.host);
    

const myurl=new URL('http://localhost:3000/abc/def');
    

    res.writeHead(200,{'Content-Type':'text/html'});
    res.write('<h3>Hello '+myurl.href+" "+'</h3>');
    res.end();

});
server.listen(3000,()=>{
    console.log('server running on port 3000')
});