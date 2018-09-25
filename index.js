var express             = require('express');

const { MongoClient }   = require("mongodb");

const dbName = 'shop_db';
const url    = 'mongodb://localhost:27017'; 


var app = express();

app.use(express.json());

app.options("/*", function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  res.send(200);
});

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.post('/get-products', (request, response) => 
{
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.status(200);
    
    (async ()=>
    {
        const client     = await MongoClient.connect(url, { useNewUrlParser: true });
    
        const db         = client.db(dbName);
    
        const collection = db.collection('products');
        //var products = require('./lib/products.json');
        //collection.insertMany(products)
        
        collection.find().toArray(function(err, products) 
        {
            client.close();
            response.send(products);
        });
    
    })();
})

app.post('/add-orders', (request, response) => 
{
    console.log(request.body);

    response.setHeader('Access-Control-Allow-Origin', '*');
    response.status(200);
    

    (async ()=>
    {
        const client     = await MongoClient.connect(url, { useNewUrlParser: true });
        const db         = client.db(dbName);
        const collection = db.collection('orders');
        
        const data = request.body.products.map((el)=>{
           delete el._id;
           el.customer = request.body.customer
           return el;
        })

        collection.insertMany(data);

        client.close();

        response.send({success:true});
        
    })();
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});