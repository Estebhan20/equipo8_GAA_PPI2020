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

 mysqlConnection.query(nuevoReciclaje,Reciclaje, (err,results,fields) => {
   if(err){
     return console.error(err.message);
   }
   res.json({message:`Reciclaje Almacenada en la base de datos`})
 });
});

router.put('/Reciclaje/:id', (req,res) => {
  const {Lugar_de_encuentro,Fecha_y_hora,Descripcion,ID_Usuario} = req.body
  const { id } = req.params 

mysqlConnection.query(`UPDATE Reciclaje SET Lugar_de_encuentro = ?,Fecha_y_hora = ?,Descripcion= ?,ID_Usuario= ? WHERE id = ?`,[Lugar_de_encuentro,Fecha_y_hora,Descripcion,ID_Usuario,id], (err, rows,fields) => {
   if(!err){
    res.json({status: `El Reciclaje ha sido actualizado con éxito`});
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