const express = require ('express');
const app = express();
const path = require ('path');
const cors = require('cors')

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});
     
const Reciclaje = require ('./src/routes/Reciclaje.js')
app.use('/api',Reciclaje);
const Usuario = require ('./src/routes/Usuario.js')
app.use('/api',Usuario);
const Recordatorio = require ('./src/routes/Recordatorio.js')
app.use('/api',Recordatorio);
const Articulo = require ('./src/routes/Articulo.js')
app.use('/api',Articulo);
const Tipo_usuario = require ('./src/routes/Tipo_usuario.js')
app.use('/api',Tipo_usuario);
const Recoger = require ('./src/routes/Recoger.js')
app.use('/api',Recoger);
const Reciclaje_Recordatorio = require ('./src/routes/Reciclaje_Recordatorio.js')
app.use('/api',Reciclaje_Recordatorio);
const Reciclador = require ('./src/routes/Reciclador.js')
app.use('/api',Reciclador);





app.use(express.urlencoded({extended: false}));

app.listen(5000,()=>{
  console.log('server started')
});