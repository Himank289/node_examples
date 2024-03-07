const express = require('express');
const app = express();
const path = require('node:path');

const mongoose = require('mongoose');

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const p = mongoose.connect('mongodb://127.0.0.1:27017/my_db1?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.0.1');
p.then((res) => {
    console.log('db connection success');
}, (err) => {
    console.log('db connection failed' + err);
});

const usersSchema = mongoose.Schema({
    _id: Number,
    name: String,
    password: String,
    profession: String
});

const User = mongoose.model("User", usersSchema);//creating collection of name User

const user1 = new User({  //creating documnents inside the collection User
    _id: 1,
    name: "Himank",
    password: "Himank",
    profession: "ml enginerr"
});

const promise = user1.save();
promise.then((res) => {
    console.log(res);
}, (err) => {
    console.log(err);
});


const user2 = new User({
    _id: 2,
    name: "Radha",
    password: "Radha",
    profession: "devloper"
});

const promise1 = user2.save();
promise1.then((res) => {
    console.log(res);
}, (err) => {
    console.log(err);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'view', 'userform1.html'));
})

app.post('/users', (req, res) => {
    const user = req.body;
    const user3 = new User({
        _id: user.id,
        name: user.name,
        password: user.password,
        profession: user.profession
    })
    user3.save().then((res1) => {
        console.log('user with id:' + user.id + 'inserted');
        console.log(res1);
        // res.status(200).send('<h3> user with id'+user.id+'posted sucessfully</h3>');
        res.redirect('/');


    }, (err) => {
        console.log(err);
        res.status(400).status('<h3>post not sucessful</h3>');
    });
})

app.get('/users', (req, res) => {
    User.find().then(result => {
        console.log(result);
        const user1 = [];

        result.forEach((user, index) => {
            user1.push({ id: user._id, name: user.name, password: user.password, profession: user.profession });
        })
        console.log(user1);
        res.send(user1);
    }, err => {
        console.log(err);
    })
});


app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    User.find({ '_id': id }).then(result => {
        console.log(result);
        const user1 = [];

        result.forEach((user, index) => {
            user1.push({ id: user._id, name: user.name, password: user.password, profession: user.profession });
        })
        console.log(user1);
        res.send(user1);
    }, err => {
        console.log(err);
    })
});

app.get('/users/:id/:name', (req, res) => {
    const id = req.params.id;
    const name = req.params.name;
    const filter = { '_id': id, 'name': name };
    User.find(filter).then(result => {
        console.log(result);
        const user1 = [];

        result.forEach((user, index) => {
            user1.push({ id: user._id, name: user.name, password: user.password, profession: user.profession });
        })
        console.log(user1);
        res.send(user1);
    }, err => {
        console.log(err);
    })
});

app.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    User.deleteOne({ '_id': id }).then(result => {
        console.log(result);
        res.send({ message: 'User deleted successfully' });
    }, err => {
        console.log(err);
    })
});

app.put('/users/:id', (req, res) => {
    const id = req.params.id;
    const updatedUserInfo = req.body;

    User.findOneAndUpdate({ '_id': id }, updatedUserInfo, { new: true })
        .then(updatedUser => {
            if (!updatedUser) {
                return res.status(404).send({ error: 'User not found' });
            }
            console.log(updatedUser);
            res.send({ message: 'User details updated successfully', user: updatedUser });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ error: 'An error occurred while updating user details' });
        });
});


// app.put('/users/:id',(req,res)=>{
//     let u = req.body;
 
//     let id = u.id;
//     let name = u.name;
//     let password = u.password;
//     let profession =u.profession;
//      console.log(id+","+name+","+password+"."+profession);
   
 
//     User.updateOne({_id:id},{
//         name: name,
//         password:password,
//         profession:profession
//     }).then((result)=>{
//         console.log("Updated successfully");
//         res.send(200,"updated succesfully");
//         // res.sendStatus(200).send("Saved Successfully");
//     },
//     (err)=>{
//         console.log(err);
//         res.send(400,"Failed to update");
//         // res.sendStatus(400).send("Post failed");
//     });
// })


app.listen(3000, (req, res) => {
    console.log('appis running on port 3000');
});