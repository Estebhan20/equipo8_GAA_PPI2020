const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
host: 'bvxvye6pkgpe1pk6obro-mysql.services.clever-cloud.com',
user:'ubvwacvjxohgccbv',
password:'MWnp1WhoLbXVFuPscAmn',
database: 'bvxvye6pkgpe1pk6obro',
multiStatements: true
});

mysqlConnection.connect(function (err){
  if(err){
    console.log(err);
  }else{
    console.log('La base de datos está conectada')
  }
});

module.exports =  mysqlConnection;