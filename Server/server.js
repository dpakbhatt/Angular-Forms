const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = 3000;

const app = express();

app.use(bodyParser.json());

app.use(cors()); 

app.get('/', function(req, res){
    res.send("Hello from the server.");
})

app.post('/enroll', function(req, res){
    console.log(req.body);
    res.status(200).send({"message": "Data received"}); //FOR SUBMITTING DATA TO SERVER
    // res.status(401).send({"message": "Data received"}); //FOR CHECKING FOR ERROR HANDLING WECHANGE 200 TO 401
})

app.listen(PORT, function(){
    console.log("Server is running on localhost: " + PORT);
});
