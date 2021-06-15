import { default as express } from 'express';
import { default as hbs } from'hbs';
import * as path from'path';
import { default as logger } from'morgan';
import { default as cookieParser } from'cookie-parser';
import * as http from 'http';
import { approotdir } from './approotdir.mjs';
import mongoose from 'mongoose';
import moment from 'moment';



const __dirname = approotdir;
import {
    normalizePort, onError, onListening, handle404, basicErrorHandler
} from './appsupport.mjs';

import config from './config/config.mjs';

import { router as indexRouter } from './routes/index.mjs';
import { router as usersRouter } from './routes/usersRoute.mjs';
import { router as adminRouter } from './routes/admin.mjs';
//import { sendMail } from "./mailsend.mjs";

// Connection URL
mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUri, { 
  useNewUrlParser: true,
   useCreateIndex: true,
    useUnifiedTopology: true,
     useFindAndModify: false,
     autoIndex: true });
mongoose.connection.on('error', () => {
  console.log(`unable to connect to database: ${config.mongoUri}`);
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, 'partials'));


//local data 
app.locals.moment=moment;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/email-activator-secure-user-check-weblink-signin', usersRouter);
app.use('/admin-001best', adminRouter);

// error handlers
// catch 404 and forward to error handler
app.use(handle404);
app.use(basicErrorHandler);

export const port = normalizePort(config.port);
app.set('port', port);

export const server = http.createServer(app);


server.listen(port);
server.on('error', onError);
server.on('listening', onListening);