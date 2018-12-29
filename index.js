const mathAdd = require('./mathAdd.js');
const mathMultiply = require('./mathMultiply.js');
const request = require('request');



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
    response.send(`<h2>MATH</h2><br><a href="http://localhost:3000/math/add">ADDITION</a><h4><b>Search Format:</b></h4><p>localhost:3000/math/add<b>/?[param1]=[num1]&[param2]&[num2]...</b></p>
    <br><a href="http://localhost:3000/math/add">MULTIPLY</a><h4><b>Search Format:</b></h4><p>localhost:3000/math/multiply<b>?[param1]=[num1]&[param2]&[num2]...</b></p>
    <h2>GIPHY SEARCH</h2><br><a href="http://localhost:3000/gif/search">GIF SEARCH</a><h4><b>Search Format:</b></h4><p>localhost:3000/gif/?<b>search=[parameter]</b></p>`);
});


app.get('/math/add',(request, response)=>{
    response.contentType('.html');
    const url = request.url;
    response.send(mathAdd.add(url));
});

app.get('/math/multiply',(request, response)=>{
    response.contentType('.html');
    const url = request.url;
    response.send(mathMultiply.multiply(url));
});

app.get('/gif',(req, res)=>{
    const api_key = 'siIyo4w5mg0REENX76Sr57QTgkt3BWvY';
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=${req.query.search}`;
    request(url, (error, response, body) => {
        let arr = [];
        const toDisplay = JSON.parse(body).data;
        for(let i=0;i<toDisplay.length; i++){
           arr.push(toDisplay[i].images.original.url);
        }
        res.send(arr);
});
});


//Get your app serve to listen for requests
app.listen(port, ()=>{
    console.log('Server is listening on port 3000')
});
