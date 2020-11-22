const {Router} = require('express');
const router = Router();


const mysqlConnection = require('./db/db.js');

router.get('/',(req,res)=>{
  res.send('Si funciona')
})

router.get('/Usuario',(req,res)=>{
  mysqlConnection.query('SELECT * FROM Usuario',
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

router.post('/Usuario', (req, res) => {
  const {id,Nombres,Apellidos,ID_Usuario,Celular,telefono,Correo,Contraseña,Ciudad,Calle,Numero,Barrio} = req.body
  let Usuario = [id,Nombres,Apellidos,ID_Usuario,Celular,telefono,Correo,Contraseña,Ciudad,Calle,Numero,Barrio];
  let nuevoUsuario = `INSERT INTO Usuario VALUES (?,?,?,?,?,?,?,?,?,?,?,?);`

 mysqlConnection.query(nuevoUsuario,Usuario, (err,results,fields) => {
   if(err){
     return console.error(err.message);
   }
   res.json({message:`Usuario Almacenada en la base de datos`})
 });
});

router.put('/Usuario/:id', (req,res) => {
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