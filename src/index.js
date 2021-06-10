const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dotenv.config(); // getting ENV variables

const Options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
};

mongoose.connect(process.env.mongoDB_URL, Options)

const db = mongoose.connection;
db.on('error',  (err)=> console.log(`Something went wrong!`, err));
db.once('open', function() {
    console.log(`We're Connected with DB`);
});

app.get('/',(req, res)=>{
    res.send('Hello from server');
})

app.listen(process.env.PORT,()=>{
    console.log('Server is running');
})