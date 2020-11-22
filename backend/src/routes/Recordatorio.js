const {Router} = require('express');
const router = Router();


const mysqlConnection = require('./db/db.js');

router.get('/',(req,res)=>{
  res.send('Si funciona')
})

router.get('/Recordatorio',(req,res)=>{
  mysqlConnection.query('SELECT * FROM Recordatorio',
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

router.post('/Recordatorio', (req, res) => {
  const {id,Mensaje,Fecha,Descripcion,Hora} = req.body
  let Recordatorio = [id,Mensaje,Fecha,Descripcion,Hora];
  let nuevoRecordatorio = `INSERT INTO Recordatorio VALUES (?,?,?,?,?);`

 mysqlConnection.query(nuevoRecordatorio,Recordatorio, (err,results,fields) => {
   if(err){
     return console.error(err.message);
   }
   res.json({message:`Recordatorio Almacenado en la base de datos`})
 });
});

router.put('/Recordatorio/:id', (req,res) => {
  const {Mensaje,Fecha,Descripcion,Hora} = req.body
  const { id } = req.params 

mysqlConnection.query(`UPDATE Recordatorio SET Mensaje =?,Fecha =?,Descripcion =?,Hora= ? WHERE id = ?`,[Mensaje,Fecha,Descripcion,Hora,id], (err, rows,fields) => {
   if(!err){
    res.json({status: `El Recordatorio ha sido actualizado con éxito`});
   }else{
     console.log(err);
   }
});
});


router.delete('/Recordatorio/:id', (req,res) => {
  const { id } = req.params;
  mysqlConnection.query(`DELETE FROM Recordatorio WHERE id =?`,[id],(err,rows,fields) => {
    if("!err"){
      res.json({status: `El Recordatorio ha sido eliminado`})
    }else{
      console.log(err);
    }
  });
});




module.exports = router;