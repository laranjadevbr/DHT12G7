const cors = require('cors');
const express = require('express');
require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended : false,
}));
app.use(require('../routes'));
// require('http').createServer(app).listen(process.env.PORT, () => {
//     console.log(`Server running on "${ process.env.PORT }" port [...].`);
// });
app.listen(process.env.PORT, () => {
    console.log({
        message : 'Server running',
        port : `${ process.env.PORT }`,
    });
});