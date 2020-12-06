const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const todoRoute = require('./routes/todoRoute');
const url = "mongodb://127.0.0.1:27017/Todo_App"
const PORT = 8000;

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



app.listen(PORT, () => {
    console.log(`app is connected at http://localhost:${PORT}`);
})