export let projects = {};
export class Project{
    name = "";
    progress = 0;
    toDoLists = {};

    static removeProject(project){
        delete projects[project];
    }
    constructor(name){
        console.log("Project constructor called for: " + name);
        this.name = name;
        projects[name] = this;
    }
    loadProject(progress, toDoLists){
        this.progress = progress;
        this.toDoLists = toDoLists;
    }
    createToDoList(name){
        let newList = new toDoList(name);
        this.toDoLists[newList.name] = newList;
    }
}