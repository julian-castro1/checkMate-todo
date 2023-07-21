// import {addItem} from todoList_controller.js;
import { Project, projects } from "./project.js";
import { toDoItem } from "./todo_item";
import { nameToId } from "./index.js";

export class toDoList {
  name = "";
  progress = 0;
  complete = false;
  toDoItems = {};
  path = "test";
  progress_bar = null;

  constructor(name) {
    this.name = name;
  }
  static duplicate(name) {
    return this.toDoItems.hasOwnProperty(nameToId(name));
  }
  createToDoItem(attributes) {
    attributes.path = this.path + "/" + attributes.name;
    let item = new toDoItem(attributes);
    this.toDoItems[item.nameToId(name)] = item;
  }
  loadListItems() {}
  static deleteList(e) {
    let proj_id = e.currentTarget.parentElement
      .getAttribute("id")
      .split("_")[0];
    let list_id = e.currentTarget.getAttribute("id");

    // remove the list from the project
    delete projects[proj_id].toDoLists[list_id];
    document
      .getElementById(proj_id + "_lists")
      .removeChild(document.getElementById(list_id));

    // update the project progress
    projects[proj_id].updateProgress();
  }
  deleteListItem(id) {
    // delete the id from toDoItems
    delete this.toDoItems[id];
  }
  updateProgress() {
    let total = 0;
    let finished = 0;
    for (let key in this.toDoItems) {
      if (this.toDoItems.hasOwnProperty(key)) {
        console.log(this.toDoItems[key]);
        finished += this.toDoItems[key].updateProgress();
        total++;
      }
    }
    this.progress = total === 0 ? 0 : finished / total;

    this.complete = this.progress === 1;
    console.log("finished: " + finished + ", total: " + total + ", progress: " + this.progress);
    this.progress_bar.animate(this.progress);
  }

  // update progress on the project
}