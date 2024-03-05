var express=require('express');
var path=require('node:path');

var app = express();
app.use(express.urlencoded({extended:'true'}));
app.use(express.json());

// app.get('/', function (req, res) {
//    // res.send('Hello World');
//    res.sendFile(path.join(__dirname,'html','index1.html'));
// })


app.get('/home', function (req, res) {
    let filepath=path.join(__dirname,'html','home.html');
    console.log(filepath);
    res.sendFile(filepath);
 })

 app.get('/form',(req,res)=>{
    res.sendFile(path.join(__dirname,'html','form.html'));
 })

 app.get('/personform',(req,res)=>{
    res.sendFile(path.join(__dirname,'html','personform.html'));
 })

 app.get('/person',(req,res)=>{
    const q=req.query;
    // console.log(q);
    res.end(JSON.stringify(q));
 })

 app.post('/person',(req,res)=>{
    console.log(req.method);
    console.log(req.url);

    const p=req.body;
    console.log(p);
    res.end(JSON.stringify(p));
 })

 app.get('/person1', function (req, res) {
   // res.send('Hello World');
   res.sendFile(path.join(__dirname,'html','index1.html'));
})

 app.post('/person1',(req,res)=>{
    console.log(req.method);
    console.log(req.url);

    const p=req.body;
    console.log(p);
    res.end(JSON.stringify(p));
 })

var server = app.listen(5000, function () {
   console.log("Express App running at http://localhost:5000/");
})