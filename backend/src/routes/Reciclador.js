const {Router} = require('express');
const router = Router();


const mysqlConnection = require('./db/db.js');

router.get('/',(req,res)=>{
  res.send('Si funciona')
})

router.get('/Reciclador',(req,res)=>{
  mysqlConnection.query('SELECT * FROM Reciclador',
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

router.post('/Reciclador', (req, res) => {
  const {id,id,Nombres,Telefono,Row_3} = req.body
  let Reciclador = [id,id,Nombres,Telefono,Row_3];
  let nuevoReciclador = `INSERT INTO Reciclador VALUES (?,?,?,?,?);`

 mysqlConnection.query(nuevoReciclador,Reciclador, (err,results,fields) => {
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