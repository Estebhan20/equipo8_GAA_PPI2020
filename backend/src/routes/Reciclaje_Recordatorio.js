const {Router} = require('express');
const router = Router();


const mysqlConnection = require('./db/db.js');

router.get('/',(req,res)=>{
  res.send('Si funciona')
})

router.get('/Reciclaje_Recordatorio',(req,res)=>{
  mysqlConnection.query('SELECT * FROM Reciclaje_Recordatorio',
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

router.post('/Reciclaje_Recordatorio', (req, res) => {
  const {ID_Recordatorio,ID_Reciclaje} = req.body
  let Reciclaje_Recordatorio = [ID_Recordatorio,ID_Reciclaje];
  let nuevoReciclaje_Recordatorio = `INSERT INTO Reciclaje_Recordatorio VALUES (?,?,?);`

 mysqlConnection.query(nuevoReciclaje_Recordatorio,Reciclaje_Recordatorio, (err,results,fields) => {
   if(err){
     return console.error(err.message);
   }
   res.json({message:`Reciclaje_Recordatorio Almacenada en la base de datos`})
 });
});

router.put('/Reciclaje_Recordatorio/:id', (req,res) => {
  const {ID_Recordatorio,ID_Reciclaje} = req.body
  const { id } = req.params 

mysqlConnection.query(`UPDATE Reciclaje_Recordatorio SET ID_Recordatorio = ?,ID_Reciclaje= ? WHERE id = ? `,[ID_Recordatorio,ID_Reciclaje,id], (err, rows,fields) => {
   if(!err){
    res.json({status: `El Reciclaje_Recordatorio ha sido actualizado con éxito`});
   }else{
     console.log(err);
   }
});
});





module.exports = router;