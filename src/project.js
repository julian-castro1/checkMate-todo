export class Project{
    name = "";
    progress = 0;
    toDoLists = {};

    constructor(name){
        console.log("Project constructor called for: " + name);
        this.name = name;
    }
    createToDoList(name){
        let newList = new toDoList(name);
        this.toDoLists[newList.name] = newList;
    }

}