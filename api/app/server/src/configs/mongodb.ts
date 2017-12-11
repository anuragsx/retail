import * as mongoose from 'mongoose';
import * as Promise from 'bluebird';
/**
 * Mongo config
 *
 * @export
 * @class MongoDbConfig
 */
export default class MongoDbConfig {
  public static init(): any {
    if ( process.env.NODE_ENV !== 'prod' ) {
      (<any>mongoose).Promise = Promise;
      mongoose.connect(process.env.MONGODB_HOST, {useMongoClient: true})
      .then( () => {
        console.log('MongoDbConfig was connected !');
      })
      .catch(err => {
        throw new Error(`MongoDbConfig error ! ${err}`);
      });
    }
    return mongoose;
  }
}
