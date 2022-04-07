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
    let sql = 'SELECT r.id, r.status FROM requests r WHERE r.id=?'
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
            arrayObject[0].bidderItem = rows[0]
        }
    })
    conexion.query(sql_ownerItem,[id],(err, rows, fields)=>{
        if(err) throw err;
        else{
            arrayObject[0].ownerItem = rows[0]
        }
    })
    conexion.query(sql_bidder,[id],(err, rows, fields)=>{
        if(err) throw err;
        else{
            arrayObject[0].bidder = rows[0]
        }
    })
    conexion.query(sql_owner,[id],(err, rows, fields)=>{
        if(err) throw err;
        else{
            arrayObject[0].owner = rows[0]
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

// //Get all request from user
router.get('/user/:id',(req, res)=>{
    const {id} = req.params
    let arrayObject = []
    let sql = 'SELECT r.id, r.status FROM requests r WHERE r.ownerID=? OR r.bidderID=? ORDER BY r.id DESC;'
    conexion.query(sql,[id,id],(err, rows, fields)=>{
        if(err) throw err;
        else{
            arrayObject = rows
            res.send(JSON.stringify(arrayObject))
        }
    })
});

//Post one request
router.put('/:id',( req, res)=>{
    const {id} = req.params
    const{status, bidderItem, ownerItem} = req.body
    let sql = `UPDATE requests SET status = '${status}' WHERE id = ?;`
    let sql_item = `UPDATE items SET status = 1 WHERE id = ?;`
    conexion.query(sql,[id],(err, rows, fields)=>{
        if(err) throw err
    })
    if (status == 1) {
        conexion.query(sql_item,[bidderItem],(err, rows, fields)=>{
            if(err) throw err
        })
        conexion.query(sql_item,[ownerItem],(err, rows, fields)=>{
            if(err) throw err
        })
    }
    res.json('Proccess terminated')
});

module.exports = router;