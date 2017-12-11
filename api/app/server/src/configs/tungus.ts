require('tungus');
import * as mongoose from 'mongoose';
import * as Promise from 'bluebird';

/**
 * Mongo config
 *
 * @export
 * @class MongoDbConfig
 */
export default class TungusConfig {
  public static init(): any {
    if ( process.env.NODE_ENV !== 'prod' ) {
      (<any>mongoose).Promise = Promise;
      mongoose.connect(`tingodb://${__dirname}/database`)
      .then( () => {
        console.log('MongoDbConfig was connected !');
      })
      .catch(err => {
        throw new Error(`TingoDB Connection problem: ${err}`);
      });
    }
    return mongoose;
  }
}
