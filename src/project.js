import { toDoList } from "./todo_list.js";
import ProgressBar from "progressbar.js";
import { actionProject, expandProject, collapseProject } from "./disp-project.js";
import { nameToId } from "./index.js";
import { replacer } from "./local_storage.js";

export let projects = {};
export let progress_circles = {};
export class Project {
  name = "";
  progress = 0;
  toDoLists = {};
  progress_element = null;
  path = "";

  static removeProject(project) {
    delete projects[project];
  }
  static duplicateProject(name) {
    return projects.hasOwnProperty(nameToId(name));
  }

  constructor(name) {
    this.name = name;
    this.path = name;
    projects[nameToId(name)] = this;
  }
  loadProject(progress, toDoLists, path) {
    this.progress_element = progress_circles[`${this.name}_progress`];
    this.progress = progress;
    this.toDoLists = {};
    this.path = path;

    for (let key in toDoLists) {
      if (toDoLists.hasOwnProperty(key)) {
        let listInstance = new toDoList(toDoLists[key].name);
        listInstance.progress = toDoLists[key].progress;
        listInstance.complete = toDoLists[key].complete;
        listInstance.toDoItems = toDoLists[key].toDoItems;
        listInstance.path = toDoLists[key].path;
        this.toDoLists[key] = listInstance;
      }
    }
  }
  updateProgress() {
    let total = 0;
    let complete = 0;
    for (let key in this.toDoLists) {
      if (this.toDoLists.hasOwnProperty(key)) {
        total++;
        if (this.toDoLists[key].complete) {
          complete++;
        }
      }
    }
    this.progress = complete / total;
    this.progress_element.animate(this.progress);
  }
  createToDoList(name) {
    console.log("creating new list: " + name);
    let newList = new toDoList(name);
    newList.path = this.path + "/" + name;
    this.toDoLists[nameToId(newList.name)] = newList;

    // display the new list
    let proj_ele = document.getElementById(nameToId(this.name));
    collapseProject(proj_ele);
    expandProject(proj_ele);
    this.updateProgress();
  }
  duplicateToDoList(name) {
    return this.toDoLists.hasOwnProperty(name);
  }
}