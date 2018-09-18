var express = require('express');
var products = require('./lib/products.json');

var app = express();


app.options("/*", function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  res.send(200);
});

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/products', function (req, res) {
  res.send('Hello products!');
});

app.post('/get-products', (request, response) => 
{
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.status(200);
    response.send(products);
})

app.post('/add-orders', (request, response) => 
{
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.status(200);
    response.send({success:true});
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});