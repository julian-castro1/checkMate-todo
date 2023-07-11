import {addItem} from todoList_controller.js;

class toDoList{
    disp = todoListController();
    name = "";
    progress = 0;
    complete = false;
    toDoItems = {};

    constructor(attributes){
        this.name = attributes.name;
    }
    createToDoItem(attributes){
        let item = new toDoItem(attributes);
        this.toDoItems[item.name] = item;

        addItem(item);
    }
}