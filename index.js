const request = require('request');
const mathAdd = require('./mathAdd.js');
const mathMultiply = require('./mathMultiply.js')



//Import Express Library
const express = require('express');
//Initiate an Express App
const app = express();
//Define a port
//Example: 192.168.1.1:3000  IP:PORT or localhost:3000
const port = 3000;
//Define your server's routes


app.get('/',(request, response)=>{
    response.contentType('.html');
    response.send(`<h2>MATH</h2><br><a href="http://localhost:3000/math/add">Addition</a> <p>${request.param}</p>`);
});


app.get('/math/add',(request, res)=>{
    res.contentType('.html');
    const url = request.url;
    res.send(mathAdd.add(url));
});

app.get('/math/multiply',(request, res)=>{
    res.contentType('.html');
    const url = request.url;
    res.send(mathMultiply.multiply(url));
});



app.get('/proxy', (req, res) => {
    request('http://www.google.com', {encoding: null},function (error, response, body){
    res.send(body);
});
});

//Get your app serve to listen for requests
app.listen(port, ()=>{
    console.log('Server is listening on port 3000')
});
