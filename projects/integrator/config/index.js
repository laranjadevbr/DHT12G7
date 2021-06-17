require('dotenv').config();
module.exports = {
    database : process.env.DB_DATABASE,
    dialect : process.env.DB_CONNECTION,
    host : process.env.DB_HOST,
    password : process.env.DB_PASSWORD,
    username : process.env.DB_USERNAME,
    // DB_CONNECTION=mysql
    // DB_DATABASE=integrator
    // DB_HOST=localhost
    // DB_PASSWORD=
    // DB_PORT=8888
    // DB_USERNAME=root
    operatorAliases : false,
    define : {
        timestamp : true,
        underscored : false,
        underscoredAll : false,
    },
    // dialect : 'mysql',
    // database : 'integrator',
    // host : 'localhost',
    // password : '',
    // username : 'root',
};