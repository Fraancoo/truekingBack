const router = require('express').Router();
const conexion = require('../connection')

//Get items
router.get('/',(req, res)=>{
    let sql ='SELECT * FROM items'
    conexion.query(sql,(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })
});

//Get one item
router.get('/:id',(req, res)=>{
    const {id} = req.params
    let arrayObject = []
    let sql ='SELECT * FROM items WHERE id = ?'
    let sql_user = 'SELECT u.id, u.firstName, u.lastName FROM items i JOIN users u ON u.id=i.userID WHERE i.id=?'
    let sql_tags = 'SELECT t.* FROM items i JOIN item_tag it ON it.itemID=i.id JOIN tags t ON t.id=it.tagID WHERE i.id=?'
    conexion.query(sql,[id],(err, rows, fields)=>{
        if(err) throw err;
        else{
            arrayObject = rows
        }
    })
    conexion.query(sql_user,[id],(err, rows, fields)=>{
        if(err) throw err;
        else{
            arrayObject[0].user = rows
        }
    })
    conexion.query(sql_tags,[id],(err, rows, fields)=>{
        if(err) throw err;
        else{
            arrayObject[0].tags = rows
            res.send(JSON.stringify(arrayObject[0]))
        }
    })
});

//Get items from user
router.get('/user/:id',(req, res)=>{
    const {id} = req.params
    let arrayObject = []
    let sql = 'SELECT i.* FROM items i JOIN users u ON u.id=i.userID WHERE i.status=0 AND u.id=?'
    conexion.query(sql,[id],(err, rows, fields)=>{
        if(err) throw err;
        else{
            arrayObject = rows
            res.send(JSON.stringify(arrayObject))
        }
    })
});

//Post one item
router.post('/addItem',( req, res)=>{
    const{name, description, reason, inReturn, photo, userID} = req.body
    let sql = `INSERT INTO items(name, description, reason, inReturn, photo, userID) values('${name}','${description}','${reason}','${inReturn}','${photo}','${userID}')`
    conexion.query(sql, (err, rows, fields)=>{
        if(err) throw err
        else{
            res.json({status: 'Item added successfully'})
        }
    })
});

//Post itemTags
// router.post('/addTag',( req, res)=>{
//     const{itemID, tagID} = req.body
//     let sql = `INSERT INTO item_tag VALUES('${itemID}','${tagID}')`
//     conexion.query(sql, (err, rows, fields)=>{
//         if(err) throw err
//         else{
//             res.json({status: 'Tag added successfully'})
//         }
//     })
// });

module.exports = router;