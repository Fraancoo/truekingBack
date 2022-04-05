const express = require('express');
const mysql = require('mysql');
const myconn = require('express-myconnection');
const routes = require('./routes')

const app = express();
app.set('port', process.env.PORT || 9000);
const dbOptions = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'trueking_db'
}

app.use(myconn(mysql, dbOptions, 'single'));

app.get('/', (req, res)=> {
    res.send('Hola mundo!');
});
app.use('/api', routes);

app. listen(app.get('port'), ()=> {
    console.log('Server running on port', app.get('port'));
});