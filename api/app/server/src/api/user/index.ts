import {Request, Response} from 'express';
import * as passport from 'passport';
import { SetRoute, IRouteConfig } from '../../core/decorators/route';

export class User {
  
  @SetRoute(<IRouteConfig>{
    method: 'GET',
    path: '/v1/user',
    middelware: passport.authenticate('jwt', { session: false })
  })
  static profile( req: Request, res: Response ) {
    let { email, username, id} = req.user;
    res.json({ data: { email, username, id } });
  }

  @SetRoute(<IRouteConfig>{
    method: 'GET',
    path: '/v1/userfind'
  })
  static findUser( req: Request, res: Response ) {
    const { User } = req.app.locals;
    User.find({}, (err: any, users: any)=> {
        if ( err ) {
          return res.status(400).json(err);
        }
        res.json({ data: users });
    });
  }

}