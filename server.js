const express = require('express');
var bodyParser = require("body-parser")
const cors = require('cors');
const app = express();
app.set('port', process.env.PORT || 9000);

app.use(bodyParser.json())
app.use(cors());

//---------- API Routes ----------
app.use('/users', require('./routes/users'));
app.use('/items', require('./routes/items'));
app.use('/requests', require('./routes/requests'));

app. listen(app.get('port'), ()=> {
    console.log('Server running on port', app.get('port'));
});