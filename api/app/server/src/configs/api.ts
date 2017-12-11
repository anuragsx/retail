import * as express from 'express';
import * as passport from 'passport';
import * as api from '../api/index';

export default class ApiConfig {
  
  static init( router: express.Router ) {   
    
    let apis = Object.keys(api).map(key => {
      console.log('Load API:', key);
      return (api as {[key: string]: any})[key];
    });
    
    apis.forEach( module => {
      if( module.prototype['router']) {
         router.use('/api', module.prototype['router']);
      }
    });
  
  }
}