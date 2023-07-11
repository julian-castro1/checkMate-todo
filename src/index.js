import "./styles.css";
import "material-design-icons/iconfont/material-icons.css";
import { Project } from "./project.js";
// import { ToDoList } from "./todo_list.js";
// import { ToDoItem } from "./todo_item.js";
// import { Checklist } from "./checklist.js";
import { newProj_popup } from "./disp-project.js";
import { downloadData, uploadData } from "./local_storage.js";



buildHomePage();
eventListeners();

function eventListeners(){
    document.getElementById("add-project").addEventListener("click", newProj_popup);
    window.addEventListener("beforeunload", uploadData);
    window.addEventListener("load", loadAllData);
}
function loadAllData(){
    // load all data from local storage
    downloadData();
}
function buildHomePage(){
    // this is the function that is called on first load
    let sidebar = document.createElement("div");
    sidebar.id = "sidebar";

    // create logo div
    let logo = document.createElement("div");
    let materialIcon = document.createElement("img");
    let name = document.createElement("span");
    name.innerHTML = "CheckMate";
    materialIcon.src = "./chess.svg";
    materialIcon.id = "material-chess";
    logo.id = "logo";
    logo.appendChild(materialIcon);
    logo.appendChild(name);
    sidebar.appendChild(logo);

    document.body.appendChild(sidebar);

    // divider
    let divider = document.createElement("div");
    divider.id = "side-bar-div";

    sidebar.appendChild(divider);

    // content div for projects
    let content = document.createElement("div");
    content.id = "content";
    sidebar.appendChild(content);

    // buttons
    let buttons = document.createElement("div");
    buttons.id = "buttons";
    let newProject = document.createElement("button");
    let newList = document.createElement("button");
    let addDiv = document.createElement("div");
    addDiv.id = "add-div";
    newProject.id = "add-project";
    newList.id = "add-list";
    newProject.innerHTML = "New Project";
    newList.innerHTML = "New List";
    buttons.appendChild(newProject);
    buttons.appendChild(addDiv);
    buttons.appendChild(newList);

    sidebar.appendChild(buttons);

    // projects
    // createInitialProject();
    
    // buildProjects();
    // buildToDoList();
    // buildToDoItems();
    // buildChecklists();


}

function createInitialProject(){

}