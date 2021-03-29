const express = require('express');
const app = express();

const knex = require('knex');
const trx = knex.transaction;

const { raw } = require('objection');

const bodyParser = require('body-parser');

const setupDb = require("./db/db-setup");
const User = require("./db/models/youtuber");

// const knex = User.knex();

// app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

setupDb();

app.get('/test', async (req, res)=>{
    res.json({
        "message" : "success"
    })
});

app.get('/User/:id', async(req, res, err)=>{

    try{
        const { id } = req.params;
        const user = await User.query().findById(id).withGraphFetched('channel');
        // const user = await knex.raw("SELECT ")
        res.json(user);
    }
 
    catch(err){
        res.status(500).json(err);
    }

})

app.get('/users', async(req, res, err)=>{   
    try{
        // const users = await setupDb.raw("SELECT * FROM YOUTUBER");
        // await transaction(User, async (User, trx) => {
        const users =  User.raw('Select * from youtuber',...params).then(data=>{
            User.fromDatabaseJson(data.rows.length ? data.rows[0] : null);
        });
        // const users = await User.query().select('id', 'name', 'email');
        res.json(users);
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json(err);
    }
})

//insert

app.post('/user', async(req, res, err)=>{
    try{
        let name = req.body.name;
        let email = req.body.email;

        console.log(name,email);

        const newPerson = await User.query().insert({
            name : name,
            email : email
        })

        res.json({
            "message" : "success",
            "person": newPerson
        });
    }
    catch(err){
        res.json(err);
    }
})

const port =  process.env.PORT || 3000 ;
app.listen(port, () => console.log(`Server is listening at port ${port}`));