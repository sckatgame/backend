require('dotenv').config();
const express = require('express');
const cors = require('cors');
const {errors} = require('celebrate');
const routes = require('./src/routes');

const app = express();

app.use(errors());
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(process.env.PORT);