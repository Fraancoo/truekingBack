const mysql = require('mysql');

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    port:'3306',
    database: 'trueking_db'
});

conexion.connect((err)=>{
    if(err){
        console.log('An error has occurred: '+ err)
    }
    else
    {console.log('Successful connection')}
});

module.exports=conexion