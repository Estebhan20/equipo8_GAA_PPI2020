const {Router} = require('express');
const router = Router();


const mysqlConnection = require('./db/db.js');

router.get('/',(req,res)=>{
  res.send('Si funciona')
})

router.get('/Articulo',(req,res)=>{
  mysqlConnection.query('SELECT * FROM Articulo',
  (err,rows,fields)=>{
    if(!err)
   {
     res.json(rows);
   }else{
     console.log(err);
   }
  })
}) 

/

router.post('/Articulo', (req, res) => {
  const {id,Nombre,Descripcion,Row_3} = req.body
  let Articulo = [id,Nombre,Descripcion,Row_3];
  let nuevoArticulo = `INSERT INTO Articulo VALUES (?,?,?,?);`

 mysqlConnection.query(nuevoArticulo,Articulo, (err,results,fields) => {
   if(err){
     return console.error(err.message);
   }
   res.json({message:`Articulo Almacenado en la base de datos`})
 });
});

router.put('/Articulo/:id', (req,res) => {
  const {Nombre,Descripcion,Row_3} = req.body
  const { id } = req.params 

mysqlConnection.query(`UPDATE Articulo SET Nombre = ?,Descripcion = ?,Row_3= ? WHERE id = ?`,[Nombre,Descripcion,Row_3,id], (err, rows,fields) => {
   if(!err){
    res.json({status: `Articulo ha sido actualizado con éxito`});
   }else{
     console.log(err);
   }
});
});

router.delete('/Reciclaje/:id', (req,res) => {
  const { id } = req.params;
  mysqlConnection.query(`DELETE FROM Reciclaje WHERE id =?`,[id],(err,rows,fields) => {
    if("!err"){
      res.json({status: `El Reciclaje ha sido eliminado`})
    }else{
      console.log(err);
    }
  });
});




module.exports = router;