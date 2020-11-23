const {Router} = require('express');
const router = Router();


const mysqlConnection = require('./db/db.js');

router.get('/',(req,res)=>{
  res.send('Si funciona')
})

router.get('/Recoger',(req,res)=>{
  mysqlConnection.query('SELECT * FROM Recoger',
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

router.post('/Recoger', (req, res) => {
  const {ID_Articulo,ID_Reciclador} = req.body
  let Recoger = [ID_Articulo,ID_Reciclador];
  let nuevoRecoger = `INSERT INTO Recoger VALUES (?,?,?,?,?);`

 mysqlConnection.query(nuevoRecoger,Recoger, (err,results,fields) => {
   if(err){
     return console.error(err.message);
   }
   res.json({message:`Recoger Almacenado en la base de datos`})
 });
});

router.put('/Recoger/:id', (req,res) => {
  const {ID_Articulo,ID_Reciclador} = req.body
  const { id } = req.params 

mysqlConnection.query(`UPDATE Reciclaje SET Lugar_de_encuentro = ?,Fecha_y_hora = ?,Descripcion= ?,ID_Usuario= ? WHERE id = ?`,[Lugar_de_encuentro,Fecha_y_hora,Descripcion,ID_Usuario,id], (err, rows,fields) => {
   if(!err){
    res.json({status: `El Reciclaje ha sido actualizado con éxito`});
   }else{
     console.log(err);
   }
});
});






module.exports = router;