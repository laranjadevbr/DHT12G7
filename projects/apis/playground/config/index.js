require('dotenv').config();
const config = {
    database : process.env.DB_DATABASE,
    dialect : process.env.DB_CONNECTION,
    host : process.env.DB_HOST,
    password : process.env.DB_PASSWORD,
    username : process.env.DB_USERNAME,
    // database : 'api',
    // dialect : 'mysql',
    // host : 'localhost',
    // password : '',
    // username : 'root',
    operatorAliases : false,
    // define : {
    //     timestamp : true,
    //     underscored : false,
    //     underscoredAll : false,
    // },
};
module.exports = config;