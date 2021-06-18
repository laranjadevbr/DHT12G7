require('dotenv').config();
module.exports = {
    dialect : process.env.DB_CONNECTION,
    database : process.env.DB_DATABASE,
    host : process.env.DB_HOST,
    password : process.env.DB_PASSWORD,
    username : process.env.DB_USERNAME,
    // DB_CONNECTION=mysql
    // DB_DATABASE=integrator
    // DB_HOST=localhost
    // DB_PASSWORD=
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