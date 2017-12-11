import { Component, OnInit, Input,Output, EventEmitter } from '@angular/core';

@Component({
selector: 'app-tree-view',
templateUrl: './tree-view.component.html',
styleUrls: ['./tree-view.component.css']
})
export class TreeViewComponent implements OnInit {
	@Input() data : any;

	@Output() onFocusNode:EventEmitter<any> = new EventEmitter();
	@Output() onLostFocusNode:EventEmitter<any> = new EventEmitter();

	traversalOrder: any [] = [];
	nodeWidth = 150;
	nodeHeight = 30;
	canvasHeight: any;
	canvasWidth: any;
	nodeselect = 0;

	constructor() { }

	traverse(node: any, level: any) {
		if (node == undefined) {
			return;
		}
		this.traversalOrder.push({ 
			name: node.name, 
			_id: node._id,
			level: level,
			parent: -1
		});

		if (node.children == undefined) {
			return;
		}
		for (let i = 0; i < node.children.length; i++) {
			this.traverse(node.children[i], level + 1);
		}
	}

	findParent(i: number) {
		let level = this.traversalOrder[i].level;
		let parentLevel = -1;
		if (level == 0) {
			return -1;
		}

		for (let j = i - 1; j >= 0; j--) {
			if (this.traversalOrder[j].level == level - 1) {
				return j;
			}
		}
	}

	findAllParents() {

		for (let i = 0; i < this.traversalOrder.length; i++) {
		this.traversalOrder[i].parent = this.findParent(i);
		}
	}

	private focusFunction(idselect: any) {
		this.nodeselect = idselect;
		this.onFocusNode.emit(idselect);
	}

	private renderClass(idnode: any) {
		if(this.nodeselect == idnode) {
			return {
				recTitleSelect: true
			}
		} else {
			return {
				recTitle: true
			}
		}
	}

	private renderYRoot(node: any, index: number) {
		if(index == 1) {
			return 0;
		} else {
			return ( this.nodeHeight * ( node.parent+1 ) + 10 );
		}
	}

	ngOnChanges() {
		this.traversalOrder = [];
		this.traverse(this.data, 0);
		this.findAllParents();
		this.canvasHeight = (this.traversalOrder.length + 1) * this.nodeHeight;
		let maxLevel = -1;
		for (let i = 0; i < this.traversalOrder.length; i++) {
			if (this.traversalOrder[i].level > maxLevel) {
				maxLevel = this.traversalOrder[i].level;
			}
		}
		this.traversalOrder = this.traversalOrder.filter(item => {
			return item._id != undefined;
		})
		this.canvasWidth = (maxLevel + 3) * this.nodeWidth;		
		if(this.data.children == undefined) {
			this.traversalOrder = [];
			return;
		}
		if(this.data.children.length == 0) {
			this.traversalOrder = [];
		}
	}

	ngOnInit() {
		// this.traverse(this.data, 0);
		// this.findAllParents();
		// this.canvasHeight = (this.traversalOrder.length + 1) * this.nodeHeight;
		// let maxLevel = -1;
		// for (let i = 0; i < this.traversalOrder.length; i++) {
		// if (this.traversalOrder[i].level > maxLevel) {
		// 	maxLevel = this.traversalOrder[i].level;
		// }
		// }
		// this.canvasWidth = (maxLevel + 3) * this.nodeWidth;
	}

}
