import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { ShowCategory } from '../models/showCategory';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_CATEGORIES_URI, API_URI } from '../shared/httpApi';
import { Chapter } from '../models/chapter';
import {ShowChapter} from "../models/showChapter";

@Injectable()
export class CategoryService {

  constructor(private http: HttpClient) { }

  getAllCategories(fn) {
    this.http.get<Category[]>(API_CATEGORIES_URI + 'json',
      )
      .subscribe(data => {
           fn(null, data);
      });
   }

   addCategory(newCategory: Category, fn) {
     this.http.post(API_CATEGORIES_URI + 'create', newCategory)
     .subscribe(result => {
        fn(null, result);
     },
     err => {
       fn(err, null);
     }
    )
   }

  updateCategory(updateCategory) {
    return this.http.post(API_CATEGORIES_URI + updateCategory._id + '/update', updateCategory)
  }

  delCategory(id, fn) {
    this.http.post(API_CATEGORIES_URI + id + '/delete', null)
      .subscribe(result => {
          fn(null, result);
        },
        err => {
          fn(err, null);
        }
      )
  }

  getRootElement(nodes: any[]): any {
    if (!nodes || nodes.length === 0) {
      return null;
    }
    for (const node of nodes) {
      if (node.ParentName === '-1') {
        return node;
      }
    }
  }

  getNodeByName(nodes, name) {
    for ( const node of nodes) {
      if (node.Name === name) {
        return node;
      }
    }
    return null;
  }

  drawTopo(allNodes, nodes, node, seperater, parent) {
    allNodes.push(new ShowCategory(node.Name,seperater + node.Name));

    seperater += '--';
    node.ChildrenNames.forEach((val, idx, ary) => {
      const childNode = this.getNodeByName(nodes, val);
      if (childNode !== null) {
        this.drawTopo(allNodes, nodes, childNode, seperater, node);
      }
    });
  }

  drawNodes(nodes: any[]): any[] {
    let allNodes: ShowCategory[] = [];
    const root = this.getRootElement(nodes);
    if (root != null) {
      this.drawTopo(allNodes, nodes, root, '', null);
    }
    return allNodes;
  }

  getRootChildren(nodes: any[]) {
    let allChildren: Category[] = [];
    const root = this.getRootElement(nodes);
    if (root != null) {
      root.ChildrenNames.forEach((val, idx, ary) => {
        const childNode = this.getNodeByName(nodes, val);
        if (childNode != null) {
          allChildren.push(childNode);
        }
      });
    }
    return allChildren;
  }

  getAllChildren(categories: Category[], parent) {
    let allChildren: Category[] = [];
    const node = this.getNodeByName(categories, parent.Name);
    if (node != null) {
      node.ChildrenNames.forEach((val, idx, ary) => {
        const childNode = this.getNodeByName(categories, val);
        if (childNode != null) {
          allChildren.push(childNode);
        }
      })
    }
    return  allChildren;
  }

  getAllRootCategories(categories: Category[]) {
    return this.getRootChildren(categories);
  }

  getAllShowCategories(categories: Category[]) {
    return this.drawNodes(categories);
  }

  getAllChapters(category) {
    return this.http.get<ShowChapter[]>(API_CATEGORIES_URI + category._id + '/chapters');
  }

  getAllChaptersByName(name) {
    return this.http.get<ShowChapter[]>(API_CATEGORIES_URI +  '/chapters' + '?name=' + name);
  }
}
