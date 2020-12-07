const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const todoRoute = require('./routes/todoRoute');
require('dotenv').config();
const url = process.env.url;
const port =process.env.PORT | 8000;
console.log('kckskjchskcvk',url);
mongoose.connect(url,{
        useUnifiedTopology: true,
        useNewUrlParser: true
    },() => {
        console.log('connected to database');
});
mongoose.set('useFindAndModify', false);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.use('/', todoRoute);


const host = '0.0.0.0';
app.listen(port,host, () => {
    console.log(`app is connected at port ${port}`);
})