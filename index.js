import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';
import dotenv from 'dotenv';

dotenv.config({path: 'variables.env'});

const app = express();

db.authenticate()
    .then(() => {
        console.log('Base de datos conectada');
    })
    .catch(error => {
        console.log(error);
    })

const host = process.env.PORT || '0.0.0.0'
const port = process.env.PORT || 4000;

app.set('view engine','pug');

app.use( (req,resp,next) => {
    const years = new Date();

    resp.locals.ActualYear = years.getFullYear();

    resp.locals.nombreSitio = "Agencia de Viajes";

    next()
})

app.use(express.urlencoded({extended: true}));

app.use(express.static('public'));

app.use('/', router)

app.listen(port,host, () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`);
})