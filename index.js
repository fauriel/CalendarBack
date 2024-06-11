 
 /* 
 RUTAS DE USUAREIOS /AUTH
 HOST + /api/auth
 */
 
 const express = require('express');
const { dbConnection } = require('./db/config');
const cors = require('cors')
 require('dotenv').config();


 console.log(process.env)

 const app = express();

 dbConnection();
 //Rutas

 app.use(cors())

 app.use(express.static('public'));

 app.use(express.json())
 
 app.use('/api/auth', require('./routes/auth'))

 app.use('/api/events', require('./routes/events'))


 app.listen( process.env.PORT, () => {
    console.log('servidor  corriendo')
 });