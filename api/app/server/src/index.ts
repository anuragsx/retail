import * as express from 'express';
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';

import Bootstrap from './core/bootstrap';

import PassportJSConfig from './configs/passport-js';
import MongoDbConfig from './configs/mongodb';
import ApiConfig from './configs/api';
// import TungusConfig from './configs/tungus';

dotenv.config({ path: path.resolve(__dirname,'../../../.env')});

// const Engine = require('tingodb')();
const cors = require('cors');
const app:express.Express = express();
const router: express.Router = express.Router();

app.set("port", process.env.PORT || 8080);

// const db = new Engine.Db(`${__dirname}/database`, {});

if ( process.env.CLIENT_APP_PATH ) {
  app.set("client_app_path", path.resolve(__dirname, process.env.CLIENT_APP_PATH));
  app.use('/app', express.static(app.get('client_app_path')));
}

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

try {
  const db = MongoDbConfig.init();
  PassportJSConfig.init(app);
  Bootstrap.loadModels(app, db);
  ApiConfig.init(router);
} catch(e) {
  console.log('Error initianlize application', e);
}

app.use(router);

app.listen(app.get('port'), function() {
  console.log(`Express server start at port ${app.get('port')}`);
  console.log(`Static application path ${app.get('client_app_path')}`);
});
