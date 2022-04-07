const router = require('express').Router();
const conexion = require('../connection')

//Login user
router.post('/login',( req, res)=>{
    const{email, pass} = req.body
    let sql = `SELECT * FROM users WHERE email=('${email}') AND password=('${pass}')`
    conexion.query(sql, (err, rows, fields)=>{
        if(err) throw err;
        else res.json(rows[0]);
    })
});

//Get users
router.get('/',(req, res)=>{
    let sql ='SELECT * FROM users'
    conexion.query(sql,(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })
});

//Get one user
router.get('/:id',(req, res)=>{
    const {id} = req.params
    let arrayObject = []
    let sql ='SELECT * FROM users WHERE id = ?'
    let sql_items = 'SELECT i.* FROM users u JOIN items i ON i.userID=u.id WHERE i.status=0 AND u.id=?'
    let sql_tradedItems = 'SELECT i.* FROM users u JOIN items i ON i.id=u.id WHERE i.status=1 AND u.id=?'
    let sql_requests = 'SELECT r.* FROM users u JOIN requests r ON r.ownerID=u.id WHERE r.status=0 AND u.id=?'
    let sql_trades = 'SELECT r.* FROM users u JOIN requests r ON r.ownerID=u.id WHERE r.status=1 AND u.id=?'
    conexion.query(sql,[id],(err, rows, fields)=>{
        if(err) throw err;
        else{
            arrayObject = rows
        }
    })
    conexion.query(sql_items,[id],(err, rows, fields)=>{
        if(err) throw err;
        else{
            arrayObject[0].items = rows
        }
    })
    conexion.query(sql_tradedItems,[id],(err, rows, fields)=>{
        if(err) throw err;
        else{
            arrayObject[0].tradedItems = rows
        }
    })
    conexion.query(sql_requests,[id],(err, rows, fields)=>{
        if(err) throw err;
        else{
            arrayObject[0].requests = rows
        }
    })
    conexion.query(sql_trades,[id],(err, rows, fields)=>{
        if(err) throw err;
        else{
            arrayObject[0].trades = rows
            res.send(JSON.stringify(arrayObject[0]))
        }
    })
});

module.exports = router;