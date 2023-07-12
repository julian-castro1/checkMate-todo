import { toDoList } from "./todo_list.js";
import { actionProject, expandProject, collapseProject } from "./disp-project.js";

export let projects = {};
export class Project {
  name = "";
  progress = 0;
  toDoLists = {};

  static removeProject(project) {
    delete projects[project];
  }
  static duplicateProject(name) {
    return projects.hasOwnProperty(name);
  }

  constructor(name) {
    this.name = name;
    projects[name] = this;
  }
  loadProject(progress, toDoLists) {
    this.progress = progress;
    this.toDoLists = {};

    for (let key in toDoLists) {
      if (toDoLists.hasOwnProperty(key)) {
        let listInstance = new toDoList(toDoLists[key].name);
        listInstance.progress = toDoLists[key].progress;
        listInstance.complete = toDoLists[key].complete;
        listInstance.toDoItems = toDoLists[key].toDoItems;
        this.toDoLists[key] = listInstance;
      }
    }
  }

  createToDoList(name) {
    console.log("creating new list: " + name);
    let newList = new toDoList(name);
    this.toDoLists[newList.name] = newList;

    // display the new list
    let proj_ele = document.getElementById(this.name);
    collapseProject(proj_ele);
    expandProject(proj_ele);
  }
  duplicateToDoList(name) {
    return this.toDoLists.hasOwnProperty(name);
  }
}