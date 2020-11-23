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

mysqlConnection.query(`UPDATE Recoger SET ID_Articulo = ?,ID_Reciclador= ? WHERE id = ?`,[ID_Articulo,ID_Reciclador,id], (err, rows,fields) => {
   if(!err){
    res.json({status: ` Recoger ha sido actualizado con éxito`});
   }else{
     console.log(err);
   }
});
});






module.exports = router;