// import {addItem} from todoList_controller.js;
import { Project, projects } from "./project.js";
import { nameToId } from "./index.js";

export class toDoList {
  name = "";
  progress = 0;
  complete = false;
  toDoItems = {};
  path = "test";

  constructor(name) {
    this.name = name;
  }
  static duplicate(name) {
    return this.toDoItems.hasOwnProperty(name);
  }
  createToDoItem(attributes) {
    attributes.path = this.path + "/" + attributes.name;
    let item = new toDoItem(attributes);
    this.toDoItems[item.nameToId(name)] = item;
  }
  loadListItems(){
    console.log("loading list items");
  }
  static deleteList(e){
    let proj_id = e.currentTarget.parentElement.getAttribute("id").split("_")[0];
    let list_id = e.currentTarget.getAttribute("id");

    // remove the list from the project
    delete projects[proj_id].toDoLists[list_id];
    document.getElementById(proj_id + "_lists").removeChild(document.getElementById(list_id));

    // update the project progress
    projects[proj_id].updateProgress();
  }
  updateProgress() {
    let total = 0;
    let complete = 0;
    for (let key in this.toDoItems) {
      if (this.toDoItems.hasOwnProperty(key)) {
        this.toDoItems[key].updateProgress();
        total++;
        if (this.toDoItems[key].complete) { complet++; }
      }
    }
    this.progress = complete/total;
  }
}