// import {addItem} from todoList_controller.js;

export class toDoList {
  name = "";
  progress = 0;
  complete = false;
  toDoItems = {};

  constructor(name) {
    this.name = name;
  }
  static duplicate(name) {
    return this.toDoItems.hasOwnProperty(name);
  }
  createToDoItem(attributes) {
    let item = new toDoItem(attributes);
    this.toDoItems[item.name] = item;
  }
  loadListItems(){
    console.log("loading list items");
  }
}