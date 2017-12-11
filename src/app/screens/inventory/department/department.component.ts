import { Component, OnInit, Input, Injectable } from '@angular/core';
import { Api } from 'common/api.service';
import { NavBarService, NAVBAR } from 'app/screens/manager/navbar/navbar.service';

declare var $: any;

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

    /**
     * Name and Code of Node will create or edit
     */
    codenodeedit : any;
    namenodeedit = '';
    idnodeedit = '';
    idnodeparent = '';
    typenodeedit = '';

    // id of Node is slected.
    idnode = '-1';

    // content for btn delete.
    contentbtndelete = 'Delete Department';

    //content for btn modify.
    contentbtnmodify = "Modify Department";

    //array node received from server.
    arrayobject : any [] = [];
    data = {
    };
    arraydata: any [] = [];

    constructor(private requestService: Api, private _navbar: NavBarService) {
        this.requestService.getAllNodeDepartment().then((result : any) => {
            this.arraydata = result.data;
            this.data = {
                name: 'Company - Root',
                _id: '-1',
                children: this.unflatten(this.arraydata)
            }
        })
        .catch((error: any) => {
            alert('ERORR: ' + error);
        });
    }

    private unflatten(arr: any[]): any {
        var tree = [],
            mappedArr: any = {},
            arrElem,
            mappedElem;
  
        // First map the nodes of the array to an object -> create a hash table.
        for(var i = 0, len = arr.length; i < len; i++) {
            arrElem = arr[i];
            mappedArr[arrElem._id] = arrElem;
            mappedArr[arrElem._id]['children'] = [];
        }
  
  
        for (var _id in mappedArr) {
          if (mappedArr.hasOwnProperty(_id)) {
            mappedElem = mappedArr[_id];
            // If the element is not at the root level, add it to its parent array of children.
            if (mappedElem.belong_to) {
              mappedArr[mappedElem['belong_to']]['children'].push(mappedElem);
            }
            // If the element is at the root level, add it to first level elements array.
            else {
              tree.push(mappedElem);
            }
          }
        }
        return tree;
    }

    /**
     * Method check hide or show button
     */
    private checkHideSection(): boolean {
        if(this.idnode == '-1') {
            return true;
        }
        var objNode = this.arraydata.find( (item : any)=> {
                if(item._id == this.idnode) {
                    return true;
                } else {
                    return false;
                }
        });

        if ( objNode != undefined) {
            if(objNode.type == 'department') {
                return false;
            }
        } 
        return true;
    }

    /**
     * check subsection
     */
    private checkHideSubSection(): boolean {
        if(this.idnode == '-1') {
            return true;
        }
        var objNode = this.arraydata.find( (item : any)=> {
                if(item._id == this.idnode) {
                    return true;
                } else {
                    return false;
                }
        });

        if ( objNode != undefined) {
            if(objNode.type == 'section') {
                return false;
            }
        } 
        return true;
    }

    /**
     * check hide delete
     */
    private checkHideDelete() : boolean {
        if(this.idnode == '-1') {
            return true;
        }
        var objNode = this.arraydata.find( (item : any)=> {
            if(item._id == this.idnode) {
                return true;
            } else {
                return false;
            }
        });

        if ( objNode != undefined) {
            switch(objNode.type) {
                case 'department':
                    this.contentbtndelete = "Delete Department";
                    return false;
                case 'section':
                    this.contentbtndelete = "Delete Section";
                    return false;
                case 'subsection':
                    this.contentbtndelete = "Delete Sub Section";
                    return false;
                default:
                    return true;
            }
        } 
        return true;
    }

    private checkHideModify(): boolean {
        if(this.idnode == '-1') {
            return true;
        }
        var objNode = this.arraydata.find( (item : any)=> {
            if(item._id == this.idnode) {
                return true;
            } else {
                return false;
            }
        });

        if ( objNode != undefined) {
            switch(objNode.type) {
                case 'department':
                    this.contentbtnmodify = "Modify Department";
                    return false;
                case 'section':
                    this.contentbtnmodify = "Modify Section";
                    return false;
                case 'subsection':
                    this.contentbtnmodify = "Modify Sub Section";
                    return false;
                default:
                    return true;
            }
        } 
        return true;
    }

    private saveNode() {
        //case create new node
        if(this.idnodeedit == '') {
            var datainsert: any = {
            }
            if(this.idnodeparent == '-1') {
                datainsert.code = this.codenodeedit;
                datainsert.name = this.namenodeedit;
                datainsert.type = this.typenodeedit;
            } else {
                datainsert.code = this.codenodeedit;
                datainsert.name = this.namenodeedit;
                datainsert.type = this.typenodeedit;
                datainsert.belong_to = this.idnodeparent;
            }
            this.requestService.createNodeDepartment(datainsert).then((result : any) => {
                this.arraydata = result.data;
                this.data = {
                    name: 'Company - Root',
                    _id: '-1',
                    children: this.unflatten(this.arraydata)
                }
                $.notify('Create element success', 'success' );
            })
            .catch((error: any) => {
                $.notify('Create element error ' + error, 'error' );
                //alert('ERORR: ' + error);
            });
            return;
        }

        var datainsert: any = {
        }
        datainsert.code = this.codenodeedit;
        datainsert.name = this.namenodeedit;
        datainsert.type = this.typenodeedit;
        datainsert._id = this.idnodeedit;
        if(this.idnodeparent != '-1' && this.idnodeparent) {
            datainsert.belong_to = this.idnodeparent;
        } 
        this.requestService.updateNodeDepartment(datainsert).then((result : any) => {
            this.arraydata = result.data;
            this.data = {
                name: 'Company - Root',
                _id: '-1',
                children: this.unflatten(this.arraydata)
            }
            $.notify('Update element success', 'success' );
        })
        .catch((error: any) => {
            $.notify('Update element error ' + error, 'error' );
            //alert('ERORR: ' + error);
        });     
    }

    /**
     * Method delete a node select
     */
    deleteNode() {
        this.requestService.deleteNodeDepartment({_id: this.idnode}).then((result : any) => {
            this.arraydata = result.data;
            this.data = {
                name: 'Company - Root',
                _id: '-1',
                children: this.unflatten(this.arraydata)
            }
            $.notify('Delete element success', 'success' );
        })
        .catch((error: any) => {
            $.notify('Delete element error ' + error, 'error' );
            //alert('ERORR: ' + error);
        });     
    }

    private closePopup() {
        this.codenodeedit = '';
        this.namenodeedit = '';
        this.idnodeedit = '';
        this.idnodeparent = '';
        this.typenodeedit = '';
    }

    /**
     * method open modal
     * @param typenode 
     */
    private openModal(typenode: string) {
        switch(typenode) {
            case 'modify':
                this.idnodeedit = this.idnode
                let objectNode = this.arraydata.find((item: any)=> {
                    if(item._id == this.idnode) {
                        return true;
                    }
                });
                if(objectNode) {
                    if(objectNode._id) {
                        this.codenodeedit = objectNode.code;
                        this.namenodeedit = objectNode.name;
                        this.idnodeparent = objectNode.belong_to;
                        this.typenodeedit = objectNode.type;
                    }
                }
                break;
            default:
                this.codenodeedit = '';
                this.namenodeedit = '';
                this.idnodeedit = '';
                this.idnodeparent = '';
                this.typenodeedit = '';
                break;
        }
        switch(typenode) {
            case 'department':
                this.idnodeparent = '-1';
                this.typenodeedit = 'department';
                break;
            case 'section':
                this.idnodeparent = this.idnode;
                this.typenodeedit = 'section';
                break;
            case 'subsection':
                this.idnodeparent = this.idnode;
                this.typenodeedit = 'subsection';
                break;
        }
    }

    /**
     * set id for node is selected
     * @param  
     */
    private onFocus($event: any): void {
        this.idnode = $event;
    }

    private onLostFocus($event: any): void {
        //this.btnHide = true;
    }

    private exitPage() {
        this._navbar.open(NAVBAR.ANALITICS.MENU1);
    }

    ngOnInit() {
    }

}
