import {Request, Response} from 'express';
import { SetRoute, IRouteConfig } from '../../core/decorators/route';

export class Payment {
  
  @SetRoute(<IRouteConfig>{
    method: 'POST',
    path: '/v1/payment/amount',
  })
  static paymentAmount( req: Request, res: Response ) {
    // @TODO: Need add logic here for payment amount
    let { amount } = req.body;
    res.json({ data: { status: 'OK' }});  
  }
}