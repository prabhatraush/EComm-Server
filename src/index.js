const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/',(req, res)=>{
    res.send('Hello from server');
})

app.listen('3000',()=>{
    console.log('Server is running ');
})