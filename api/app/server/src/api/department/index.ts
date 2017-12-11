import {Request, Response} from 'express';
import { SetRoute, IRouteConfig } from '../../core/decorators/route';
import  { Types } from 'mongoose'
import { Type } from '@angular/core/src/type';

var  async = require('async');
//import { async } from '@angular/core/testing';
//import { DepartmentComponent } from 'app/screens/inventory/department/department.component';

export class DepartmentApi {

  @SetRoute(<IRouteConfig>{
    method: 'POST',
    path: '/v1/department',
  })
  static create( req: Request, res: Response ) {
    const { Department } = req.app.locals;

    //check length limit of name.
    if(req.body.name) {
      if(req.body.name.length > 10){
        return res.status(400).json({message: 'name have length more than 10 char!'});
      }
    }

    //check id has exists in db.
    Department.findOne({code: req.body.code}, (err: any, departmentexists: any) => {
      if ( err ) {
        return res.status(400).json(err);
      }
      if(departmentexists) {
        if(departmentexists._id) {
          return res.status(400).json({message: 'Id has exists'});
        }
      }
      Department.create(req.body, (err: any, department: any)=> {
        if ( err ) {
          return res.status(400).json(err);
        }
        Department.find({}, (err: any, departments: any)=> {
          if ( err ) {
            return res.status(400).json(err);
          }
          res.json({ data: departments });
        });
      });
    });
  }

  /**
   * update data
   * @param req 
   * @param res 
   */
  @SetRoute(<IRouteConfig>{
    method: 'PUT',
    path: '/v1/department/:id',
  })
  static update( req: Request, res: Response ) {
    const { Department } = req.app.locals;
    //check length limit of name.
    if(req.body.name) {
      if(req.body.name.length > 10){
        return res.status(400).json({message: 'name have length more than 10 char!'});
      }
    }
     //check id has exists in db.
    Department.findOne({code: req.body.code}, (err: any, departmentexists: any) => {
      if ( err ) {
        return res.status(400).json(err);
      }
      if(departmentexists) {
        if(departmentexists._id != req.params.id) {
          return res.status(400).json({message:'Can not use this ID, please use other ID.'});
        }
      }
      Department.update({ _id: req.params.id }, { $set: req.body},  (err: any, department: any)=> {
        if ( err ) {
          return res.status(400).json(err);
        }
        Department.find({}, (err: any, departments: any)=> {
          if ( err ) {
            return res.status(400).json(err);
          }
          res.json({ data: departments });
        });
      });
    });
  }

  /**
   * get data
   */
  @SetRoute(<IRouteConfig>{
    method: 'GET',
    path: '/v1/departments'
  })
  static findDepartment( req: Request, res: Response ) {
    const { Department } = req.app.locals;
    Department.find({}, (err: any, departments: any)=> {
        if ( err ) {
          return res.status(400).json(err);
        }
        res.json({ data: departments });
    });
  }

  
  /**
   * delete data
   */
  @SetRoute(<IRouteConfig>{
    method: 'DELETE',
    path: '/v1/department/:id',
  })
  static delete( req: Request, res: Response ) {
    const { Department } = req.app.locals;
    Department.find({}, function(err: any, departments: any){
        if ( err ) {
          return res.status(400).json(err);
        }
        var arrayid : any[] = [];
        arrayid = DepartmentApi.findAllChild(req.params.id, departments);
        async.map(arrayid, function(item: any, cb: any){
          Department.findByIdAndRemove(item, (error: any, result: any) => {
            cb(null);
          });
        }, function(err: any, results: any) {
          Department.find({}, (err: any, departmentsresult: any)=> {
            if ( err ) {
              return res.status(400).json(err);
            }
            res.json({ data: departmentsresult });
          });
        });
    });
  }

	static findAllChild(_id: any, lidepartments: any): any[] {
	  let arraychild: any[] = [];
    arraychild.push(_id);
	  lidepartments.map((item : any) => {
	      if(item.belong_to == _id) {
	        arraychild = arraychild.concat(DepartmentApi.findAllChild(item._id.toString(), lidepartments));
	      }
	  });
	  return arraychild;
	}
}
