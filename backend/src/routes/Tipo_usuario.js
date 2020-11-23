const {Router} = require('express');
const router = Router();


const mysqlConnection = require('./db/db.js');

router.get('/',(req,res)=>{
  res.send('Si funciona')
})

router.get('/Tipo_usuario',(req,res)=>{
  mysqlConnection.query('SELECT * FROM Tipo_usuario',
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

router.post('/Tipo_usuario', (req, res) => {
  const {id,Descripcion,Nombre} = req.body
  let Tipo_usuario = [id,Descripcion,Nombre];
  let nuevoTipo_usuario = `INSERT INTO Tipo_usuario VALUES (?,?,?);`

 mysqlConnection.query(nuevoTipo_usuario,Tipo_usuario, (err,results,fields) => {
   if(err){
     return console.error(err.message);
   }
   res.json({message:`Tipo_usuario Almacenado en la base de datos`})
 });
});

router.put('/Tipo_usuario/:id', (req,res) => {
  const {Descripcion,Nombre} = req.body
  const { id } = req.params 

mysqlConnection.query(`UPDATE Tipo_usuario SET Descripcion =?,Nombre= ? WHERE id = ?`,[Descripcion,Nombre,id], (err, rows,fields) => {
   if(!err){
    res.json({status: `El Tipo_usuario ha sido actualizado con éxito`});
   }else{
     console.log(err);
   }
});
});

router.delete('/Tipo_usuario/:id', (req,res) => {
  const { id } = req.params;
  mysqlConnection.query(`DELETE FROM Tipo_usuario WHERE id =?`,[id],(err,rows,fields) => {
    if("!err"){
      res.json({status: `El Tipo_usuario ha sido eliminado`})
    }else{
      console.log(err);
    }
  });
});




module.exports = router;