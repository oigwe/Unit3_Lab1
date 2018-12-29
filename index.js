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
    response.send(`<h2>MATH</h2><br><a href="http://localhost:3000/math/add">Addition</a> <p>${request.param}</p>`);
});

let jsonObj = {
    input: {},
    sumString: '',
    sum: 0,
    error: 0,
}
const getParams = function (url) {
    let params = {};
    let interroNum = url.indexOf('?');
    const interro =   url.slice(interroNum+1);
	const vars = interro.split('&');
	for (let i = 0; i < vars.length; i++) {
		const pair = vars[i].split('=');
		params[pair[0]] = decodeURIComponent(pair[1]);
	}
    return params;
};

app.get('/math/add',(request, res)=>{
    res.contentType('.html');
    const url = request.url;
    jsonObj['input'] = getParams(url);
    jsonObj['sum'] = 0;
    jsonObj['sumString']='';
    for(values in jsonObj['input']){
        if( !Number(jsonObj['input'][values])) {
            res.send( {error: `You passed a non-number value into the parameters`});
        }
        jsonObj['sum']+= Number(jsonObj['input'][values]);
        const length = Object.keys(jsonObj['input']).length;
            if (length === 2 ){
                jsonObj['sumString']=Object.values(jsonObj['input'])[0].concat('+').concat(Object.values(jsonObj['input'])[1]);
            }
            else if (length > 2){
                for(let i = 1; i < length; i++)
                jsonObj['sumString']=Object.values(jsonObj['input'])[0].padStart('+');
            }
          
        
    }
    res.send( `${JSON.stringify(jsonObj)}`);
});

/*app.get('/math/multiply',(request, res)=>{
    res.contentType('.html');
    const a = Number(request.query.a);
    const b = Number(request.query.b);
    const result = math.multiply(a,b);
    res.send(`The answer is ${result}`);
});

app.get('/math/subtract',(request, res)=>{
    res.contentType('.html');
    const a = Number(request.query.a);
    const b = Number(request.query.b);
    const result = math.subtract(a,b);
    res.send(`The answer is ${result}`);
});

app.get('/math/divide',(request, res)=>{
    res.contentType('.html');
    const a = Number(request.query.a);
    const b = Number(request.query.b);
    const result = math.divide(a,b);
    res.send(`The answer is ${result}`);
});



app.get('/proxy', (req, res) => {
    request('http://www.google.com', {encoding: null},function (error, response, body){
    res.send(body);
});
});*/

//Get your app serve to listen for requests
app.listen(port, ()=>{
    console.log('Server is listening on port 3000')
});
