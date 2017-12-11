import {Request, Response} from 'express';
import { SetRoute, IRouteConfig } from '../../core/decorators/route';

export class Pincode {
  
  @SetRoute(<IRouteConfig>{
    method: 'POST',
    path: '/v1/pincode/check',
  })
  static checkPin( req: Request, res: Response ) {
    let { pincode } = req.body;
    if (pincode && (pincode == '1234' || pincode == '12345678')  ) {
      res.json({ data: { status: 'OK' }});  
    } else {
      res.status(400).json({ data: { status: 'BAD', message: "You enter wrong pincode, you will have 3 attempts !" }});  
    }
  }
}