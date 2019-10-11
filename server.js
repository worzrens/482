const express = require('express');
const bodyParser = require('body-parser');
var routes = require('./routes')


// create express app
const app = express();
app.use(routes)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())




// listen for requests
app.listen(4000, () => {
    console.log("Server is listening on port 4000");
});
