const http = require('node:http');
const url = require('node:url');

let server=http.createServer((req,res)=>{
    console.log(req.url);
    console.log(req.headers.host);
    console.log("headers"+req.headers.date);

    let p=url.parse(req.url,true);

   
    // console.log(p.host);
    console.log(p.pathname);
    console.log(p.search);
    // console.log(p);

    let q=p.query;
    console.log(q);

    console.log(q.name+" "+q.surname);
    const name=q.name;
    const surname=q.surname;

    res.writeHead(200,{'Content-Type':'text/html'});
    res.write('<h3>Hello '+name+" "+surname+'</h3>');
    res.end();

});
server.listen(3000,()=>{
    console.log('server running on port 3000')
});