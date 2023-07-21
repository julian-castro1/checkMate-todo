import { toDoList } from "./todo_list.js";
import { toDoItem } from "./todo_item";
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
        // populate the listInstance with the toDoItems
        for(let item in toDoLists[key].toDoItems){
            if(toDoLists[key].toDoItems.hasOwnProperty(item)){
                let attributes = {};
                attributes.name = toDoLists[key].toDoItems[item].name;
                attributes.progress = toDoLists[key].toDoItems[item].progress;
                attributes.itemsComplete = toDoLists[key].toDoItems[item].itemsComplete;
                attributes.totalItems = toDoLists[key].toDoItems[item].totalItems;
                attributes.complete = toDoLists[key].toDoItems[item].complete;
                attributes.priority = toDoLists[key].toDoItems[item].priority;
                attributes.dueDate = toDoLists[key].toDoItems[item].dueDate;
                attributes.path = toDoLists[key].toDoItems[item].path;
                attributes.project_id = toDoLists[key].toDoItems[item].project_id;
                attributes.list_id = toDoLists[key].toDoItems[item].list_id;
                attributes.checklists = toDoLists[key].toDoItems[item].checklists;

                listInstance.toDoItems[nameToId(attributes.name)] = new toDoItem(attributes);
            }
        }
        listInstance.path = toDoLists[key].path;
        this.toDoLists[key] = listInstance;
      }
    }
  }
  updateProgress() {
    let total = 0;
    let finished = 0;
    for (let key in this.toDoLists) {
      if (this.toDoLists.hasOwnProperty(key)) {
        total++;
        if (this.toDoLists[key].complete) {
          finished++;
        }
      }
    }
    this.progress = total === 0 ? 0 : finished / total;
    this.progress_element.animate(this.progress);
  }
  createToDoList(name) {
    // console.log("creating new list: " + name);
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