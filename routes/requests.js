const router = require('express').Router();
const conexion = require('../connection')

//Get requests
router.get('/',(req, res)=>{
    let sql ='SELECT * FROM requests'
    conexion.query(sql,(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })
});

//Get one request
router.get('/:id',(req, res)=>{
    const {id} = req.params
    let arrayObject = []
    let sql = 'SELECT r.id FROM requests r WHERE r.id=?'
    let sql_bidderItem = 'SELECT i.* FROM requests r JOIN items i ON r.bidderItem=i.id WHERE r.id=?'
    let sql_ownerItem = 'SELECT i.* FROM requests r JOIN items i ON r.ownerItem=i.id WHERE r.id=?'
    let sql_bidder = 'SELECT u.* FROM requests r JOIN users u ON r.bidderID=u.id WHERE r.id=?'
    let sql_owner = 'SELECT u.* FROM requests r JOIN users u ON r.ownerID=u.id WHERE r.id=?'
    conexion.query(sql,[id],(err, rows, fields)=>{
        if(err) throw err;
        else{
            arrayObject = rows
        }
    })
    conexion.query(sql_bidderItem,[id],(err, rows, fields)=>{
        if(err) throw err;
        else{
            arrayObject[0].bidderItem = rows
        }
    })
    conexion.query(sql_ownerItem,[id],(err, rows, fields)=>{
        if(err) throw err;
        else{
            arrayObject[0].ownerItem = rows
        }
    })
    conexion.query(sql_bidder,[id],(err, rows, fields)=>{
        if(err) throw err;
        else{
            arrayObject[0].bidder = rows
        }
    })
    conexion.query(sql_owner,[id],(err, rows, fields)=>{
        if(err) throw err;
        else{
            arrayObject[0].owner = rows
            res.send(JSON.stringify(arrayObject[0]))
        }
    })
});

//Post one request
router.post('/addRequest',( req, res)=>{
    const{bidderItem, ownerItem, bidderID, ownerID} = req.body
    let sql = `INSERT INTO requests(bidderItem, ownerItem, bidderID, ownerID) values('${bidderItem}','${ownerItem}','${bidderID}','${ownerID}')`
    conexion.query(sql, (err, rows, fields)=>{
        if(err) throw err
        else{
            res.json({status: 'Request added successfully'})
        }
    })
});

module.exports = router;