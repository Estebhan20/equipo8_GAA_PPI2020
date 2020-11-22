const {Router} = require('express');
const router = Router();


const mysqlConnection = require('./db/db.js');



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
   res.json({message:`Usuario Almacenado en la base de datos`})
 });
});

router.put('/Usuario/:id', (req,res) => {
  const {Nombres,Apellidos,ID_Usuario,Celular,telefono,Correo,Contraseña,Ciudad,Calle,Numero,Barrio} = req.body
  const { id } = req.params 

mysqlConnection.query(`UPDATE Usuario SET Nombres =?,Apellidos =?,ID_Usuario =?,Celular = ?,telefono = ?,Correo = ?,Contraseña = ?,Ciudad = ?,Calle = ?,Numero = ?,Barrio= ? WHERE id = ?`,[Nombres,Apellidos,ID_Usuario,Celular,telefono,Correo,Contraseña,Ciudad,Calle,Numero,Barrio,id], (err, rows,fields) => {
   if(!err){
    res.json({status: `El Usuario ha sido actualizado con éxito`});
   }else{
     console.log(err);
   }
});
});

router.delete('/Usuario/:id', (req,res) => {
  const { id } = req.params;
  mysqlConnection.query(`DELETE FROM Usuario WHERE id =?`,[id],(err,rows,fields) => {
    if("!err"){
      res.json({status: `El Usuario ha sido eliminado`})
    }else{
      console.log(err);
    }
  });
});





module.exports = router;