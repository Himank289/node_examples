const express=require('express');
const { createConnection } = require('mysql2');
var path=require('node:path');

const dbcon=require('./database').dbconn;

const app=express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/users',(req,res)=>{
    const sql='SELECT * FROM USER';
    dbcon.query(sql,(err,result)=>{

        if(err){
            console.log(err);
            res.sendStatus(404).send('<h3> users not found! </h3>');
        }
        else{
            console.log(result);
            res.setHeader('Content-Type','application/json');
            res.send(result);
        }
    });
})

app.get('/users/:id',(req,res)=>{
    console.log(req.params.id);
    let id=req.params.id;
    const sql='select * from user where id='+id;
    dbcon.query(sql,(err,result)=>{

        if(err){
            console.log(err);
            res.sendStatus(400).send('<h3> bad request </h3>');
        }
        else{
            
            console.log(result);
            if(result.length==0){
                res.status(404).send('<h3> user with id:'+id+'not found </h3>');
            }
            else{
                res.setHeader('Content-Type','application/json');
                res.send(result);
            }
           
        }
    });
})

app.get('/userform',(req,res)=>{
    res.sendFile(path.join(__dirname,'view','userform1.html'));
})

app.post('/users',(req,res)=>{
    let u=req.body;
    const sql='insert into user values(?,?,?,?)';

    let id=u.id;
    let name=u.name;
    let password=u.password;
    let profession=u.profession;
    console.log(`${id},${name},${password},${profession}`);

    dbcon.query(sql,[id,name,password,profession],(err,result)=>{
        if(err)
        {
            console.log(err.message);
            res.status(400).send('<h3>http post user failed <br/> sql error,'+err.message+'</h3>');
        }
        else{
            // res.status(200).send('<h3>http post sucessful</h3>');
            res.redirect('/userform');

        }

    })
})

app.delete('/users/:id',(req,res)=>{
    const id=req.params.id;
    console.log('user id of user o be deletd'+id);
    
    const sql='delete from user where id=?';
    dbcon.query(sql,[id],(err,result)=>{
        if(err)
        {
            console.log(err.message);
            res.status(400).send('<h3>http delete user failed <br/> sql error,'+err.message+'</h3>');
        }
        else{
            res.status(200).send('<h3>delete user  sucessful</h3>');
        }

    })
})

app.put('/users/:id',(req,res)=>{
    const id=req.params.id;
    console.log('update user with id'+id);

    const u=req.body;
    console.log(u);

    const name=u.name;
    const password=u.password;
    const profession=u.profession;

    const sql='update user set name=?,password=?,profession=? where id=?';
    dbcon.query(sql, [name,password,profession,id], function (err, result) {
        if (err) {
           console.log(err.message);
        res.sendStatus(400).send('<p>Error updating User sql eror '+err.message+'</h3>');
           
        } else {
        //    res.status(200).send('<h3> update user suscessful</h3>')
        res.redirect('/users');
           }
       });

})

app.listen(3000,(req,res)=>{
    console.log('resservice mysql started on port 3000');
})