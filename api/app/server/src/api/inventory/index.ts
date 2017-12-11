import {Request, Response} from 'express';
import { SetRoute, IRouteConfig } from '../../core/decorators/route';

export class Inventory {

  @SetRoute(<IRouteConfig>{
    method: 'POST',
    path: '/v1/inventory',
  })
  static create( req: Request, res: Response ) {
    const { Inventory } = req.app.locals;
    Inventory.create(req.body, (err: any, inventory: any)=> {
        if ( err ) {
          return res.status(400).json(err);
        }
        res.json({ data: inventory });
    });
  }

  @SetRoute(<IRouteConfig>{
    method: 'PUT',
    path: '/v1/inventory/:id',
  })
  static update( req: Request, res: Response ) {
    // @TODO: Inventory create
  }

  @SetRoute(<IRouteConfig>{
    method: 'DELETE',
    path: '/v1/inventory/:id',
  })
  static delete( req: Request, res: Response ) {
    // @TODO: Inventory create
  }
}
