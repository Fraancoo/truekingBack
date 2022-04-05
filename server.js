const express = require('express');
const app = express();
app.set('port', process.env.PORT || 9000);

//---------- API Routes ----------
app.use('/users', require('./routes/users'));
app.use('/items', require('./routes/items'));

app. listen(app.get('port'), ()=> {
    console.log('Server running on port', app.get('port'));
});