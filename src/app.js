import express, { json } from 'express'
import morgan from 'morgan'


const app = express();


import routes from './routes/index'
// settings
app.set('port', process.env.PORT || 3200);

// Middlewares
app.use(morgan('dev'));
app.use(json());
app.use(express.static(__dirname + '/utils'));

// CORE,  configurar cabeceras http
app.use( (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
}); 

// Routes
app.use('/api/v1', routes);


export default app;