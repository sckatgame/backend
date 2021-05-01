require('dotenv').config();
const app = require('express')();

app.get('/',(req,res) => res.send({"Ola":"Mundo"}))

app.listen(process.env.PORT)