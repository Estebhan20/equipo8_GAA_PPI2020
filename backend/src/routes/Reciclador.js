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
  const {id,Nombres,Telefono,Row_3} = req.body
  let Reciclador = [id,Nombres,Telefono,Row_3];
  let nuevoReciclador = `INSERT INTO Reciclador VALUES (?,?,?,?);`

 mysqlConnection.query(nuevoReciclador,Reciclador, (err,results,fields) => {
   if(err){
     return console.error(err.message);
   }
   res.json({message:`Reciclador Almacenado en la base de datos`})
 });
});

router.put('/Reciclador/:id', (req,res) => {
  const {Nombres,Telefono,Row_3} = req.body
  const { id } = req.params 

mysqlConnection.query(`UPDATE Reciclador SET Nombres = ?,Telefono = ?,Row_3= ? WHERE id = ?`,[Nombres,Telefono,Row_3,id], (err, rows,fields) => {
   if(!err){
    res.json({status: `El Reciclador ha sido actualizado con éxito`});
   }else{
     console.log(err);
   }
});
});

router.delete('/Reciclador/:id', (req,res) => {
  const { id } = req.params;
  mysqlConnection.query(`DELETE FROM Reciclador WHERE id =?`,[id],(err,rows,fields) => {
    if("!err"){
      res.json({status: `El Reciclador ha sido eliminado`})
    }else{
      console.log(err);
    }
  });
});




module.exports = router;