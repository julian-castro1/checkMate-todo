import "./styles.css";
import "material-design-icons/iconfont/material-icons.css";
import { Project } from "./project.js";
// import { ToDoList } from "./todo_list.js";
// import { ToDoItem } from "./todo_item.js";
// import { Checklist } from "./checklist.js";
import { new_project, new_item, new_list, new_checklist } from "./disp-project.js";
import { downloadData, uploadData } from "./local_storage.js";
import ProgressBar from "progressbar.js";
import main from "progressbar.js";
import flatpickr from "flatpickr";



buildHomePage();
eventListeners();
test();
testToDoItem();

export function nameToId(name){
    return name.replace(/[\s&#]/g, "-");
}
function testToDoItem(){
    let icon = document.createElement("img");
    let itemName = document.createElement("span");
    let toDoProgress = document.createElement("div");
    let progressComplete = document.createElement("span");
    let slash = document.createElement("span");
    let progressTotal = document.createElement("span");
    let dueDate = document.createElement("div");
    let dueIn = document.createElement("span");
    let daysLeft = document.createElement("span");
    let dueDateText = document.createElement("span");
    let priority = document.createElement("div");
    let priorityText = document.createElement("span");

    icon.classList.add("todoItem-icon");
    itemName.classList.add("todoItem-name");
    toDoProgress.classList.add("todoItem-progress");
    progressComplete.classList.add("todoItem-progress-complete");
    slash.classList.add("todoItem-progress-slash");
    progressTotal.classList.add("todoItem-progress-total");
    dueDate.classList.add("todoItem-dueDate");
    daysLeft.classList.add("todoItem-daysLeft");
    dueIn.classList.add("todoItem-dueIn");
    dueDateText.classList.add("todoItem-dueDate-text");
    priority.classList.add("todoItem-priority");
    priorityText.classList.add("todoItem-priority-text");

    icon.src = "./incomplete.svg";
    itemName.innerHTML = "This is a sample test to-do item";
    progressComplete.innerHTML = "1";
    slash.innerHTML = "/";
    progressTotal.innerHTML = "3";
    daysLeft.innerHTML = "3";
    dueDateText.innerHTML = " days";
    priorityText.innerHTML = "4";
    dueIn.innerHTML = "due in:  ";
    
    let todoItem = document.createElement("div");
    todoItem.classList.add("todoItem");
    todoItem.appendChild(icon);
    todoItem.appendChild(itemName);
    toDoProgress.appendChild(progressComplete);
    toDoProgress.appendChild(slash);
    toDoProgress.appendChild(progressTotal);
    todoItem.appendChild(toDoProgress);
    dueDate.appendChild(dueIn);
    dueDate.appendChild(daysLeft);
    dueDate.appendChild(dueDateText);
    todoItem.appendChild(dueDate);
    priority.appendChild(priorityText);
    todoItem.appendChild(priority);

    document.getElementById("list-items").innerHTML = "";
    document.getElementById("list-items").appendChild(todoItem);
}
function test(){
  let path_ele = document.createElement("span");
  let titlebar_ele = document.createElement("div");
  let title_ele = document.createElement("span");
  let titleProgress_ele = document.createElement("div");
  let divider_ele = document.createElement("div");
  let listItems_ele = document.createElement("div");
  let noItems_ele = document.createElement("span");

  path_ele.id = "path";
  titlebar_ele.id = "titlebar";
  title_ele.id = "title";
  titleProgress_ele.id = "title-progress";
  divider_ele.id = "divider";
  listItems_ele.id = "list-items";
  noItems_ele.id = "no-items";

  path_ele.innerHTML = "test >> path";
  title_ele.innerHTML = "Welcome to CheckMate!";
  noItems_ele.innerHTML = "open or create a project to get started!";

  titlebar_ele.appendChild(title_ele);
  titlebar_ele.appendChild(titleProgress_ele);
  listItems_ele.appendChild(noItems_ele);

  let main_ele = document.getElementById("main");
  // main_ele.appendChild(path_ele);
  main_ele.appendChild(titlebar_ele);
  main_ele.appendChild(divider_ele);
  main_ele.appendChild(listItems_ele);

  let line = new ProgressBar.Line("#title-progress", {
    strokeWidth: 10,
    easing: "easeInOut",
    duration: 1400,
    color: "#3aa445",
    trailColor: "#545454",
    trailWidth: 15,
    svgStyle: { width: "100%", height: "100%" },
  });

  line.animate(1); // Value from 0.0 to 1.0
}
function eventListeners(){
    document.getElementById("add-project").addEventListener("click", new_project);
    document.getElementById("add-list").addEventListener("click", new_list);
    // document.getElementById("add-item").addEventListener("click", new_item);
    // document.getElementById("add-checklist").addEventListener("click", new_checklist);
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

    // add content div to main doc
    let main = document.createElement("div");
    main.id = "main";
    document.body.appendChild(main);

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