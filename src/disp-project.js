import { Project, projects } from "./project.js";

export function new_project(ele){
    new_popup(ele, "Project Name");
    document.getElementById("popup-button").addEventListener("click", function () {
        let parentEle = document.getElementById("popup");
        if (!Project.duplicateProject(parentEle.children[0].value)) {
        displayNewProject(new Project(parentEle.children[0].value));
        removePopup();
      } else {
        alert("Cannot create duplicate projects");
      }
    });
}

export function new_list(ele){
    new_popup(ele, "To-Do List Name");
    document.getElementById("popup-button").addEventListener("click", function () {
        // check if a project is selected
        let proj_ele = document.querySelector(".project[selected=true]");
        if (proj_ele === null) {
          alert("Please select a project");
          return;
        }
        let proj_name = proj_ele.getAttribute("id");
        let selected_proj = projects[proj_name];

        // check if the list already exists
        let parentEle = document.getElementById("popup");
        if (selected_proj.duplicateToDoList(parentEle.children[0].value)) {
          alert("Cannot have duplicate lists within a project");
          return;
        }

        // create the list
        selected_proj.createToDoList(parentEle.children[0].value);
        removePopup();
    });
}

export function new_item(ele){
    new_popup(ele, "To-Do List Item");
}

export function new_checklist(ele){
    new_popup(ele, "Checklist Item");
}

export function new_popup(ele, ph){
    // remove any existing popups
    if(document.getElementById("popup") !== null){ removePopup(); }

    // create popup
    let popup = document.createElement("div");
    popup.id = "popup";
    let popupInput = document.createElement("input");
    popupInput.id = "popup-input";
    popupInput.placeholder = ph;
    let popupButton = document.createElement("button");
    popupButton.id = "popup-button";
    popupButton.innerHTML = "Create";

    popup.appendChild(popupInput);
    popup.appendChild(popupButton);

    document.body.appendChild(popup);

    // set cursor in the input
    document.getElementById("popup-input").focus();
}
function removePopup(){
    let popup = document.getElementById("popup");
    popup.parentNode.removeChild(popup);
}
function deleteProject(e){
    console.log("removing: " + e.currentTarget.parentNode.id);
    Project.removeProject(e.currentTarget.parentNode.id);
    e.currentTarget.parentNode.remove();
}

export function displayNewProject(project) {
  // get the content container
  let sidebar = document.getElementById("content");

  // create a new project div
  let newProj = document.createElement("div");
  newProj.id = project.name;
  newProj.classList.add("project");

  // create a container for the project title
  let projTitle = document.createElement("div");
  projTitle.classList.add("proj-title");

  // create and set properties for the project icon
  let icon = document.createElement("img");
  icon.src = "./close.svg";
  icon.classList.add("close");

  // create and set properties for the project title
  let title = document.createElement("span");
  title.innerHTML = project.name;

  // append icon and title to the project title container
  projTitle.appendChild(icon);
  projTitle.appendChild(title);

  // add event listeners
  projTitle.addEventListener("click", actionProject);
  projTitle.addEventListener(
    "contextmenu",
    function (ev) {
      ev.preventDefault();
      if (confirm("Delete Project?")) {
        deleteProject(ev);
      }
    },
    false
  );

  // append the title container to the new project div
  newProj.appendChild(projTitle);

  // create a container for the project to-do lists
    // let projLists = document.createElement("div");
    // projLists.classList.add("todo-lists");
    // projLists.id = project.name + "-lists";
    // newProj.appendChild(projLists);

  // append the new project div to the sidebar
  sidebar.appendChild(newProj);
}

export function actionProject(e) {
  let ele = e.currentTarget;
  let project = ele.parentNode;
  if (project.getAttribute("selected") === "true") {
    // collapse the project
    collapseProject(project);
  } else {
    // collapse project if another project is open and change selected to false
    let projects = document.getElementsByClassName("project");
    for (let i = 0; i < projects.length; i++) {
      if (projects[i].getAttribute("selected") === "true") {
        collapseProject(projects[i]);
      }
    }
    // expand the project
    expandProject(project);
  }
}

export function expandProject(project) {
    project.setAttribute("selected", "true");
  // set icon to expanded
  let projectTitle = project.querySelector(".proj-title");
  projectTitle.querySelector("img.close").src = "./open.svg";

  // get list div
  let toDo_ele = document.createElement("div");
  toDo_ele.classList.add("todo-lists");
  toDo_ele.id = project.getAttribute("id") + "-lists";

  // show all lists
  let pInstance = projects[project.getAttribute("id")];
  for (let key in pInstance.toDoLists) {
    console.log(pInstance.toDoLists[key]);
    toDo_ele.appendChild(buildToDoList(pInstance.toDoLists[key]));
  }

  project.appendChild(toDo_ele);
}

function buildToDoList(list){
    let list_ele = document.createElement("div");
    list_ele.classList.add("todo-list-container");
    let list_icon = document.createElement("img");
    list_icon.src = "./incomplete.svg";
    list_icon.classList.add("list-icon");
    let list_title = document.createElement("span");
    list_title.classList.add("list-title");
    list_title.innerHTML = list.name;

    list_ele.appendChild(list_icon);
    list_ele.appendChild(list_title);
    
    return list_ele;
}

export function collapseProject(project) {
  // collapse the project
  project.querySelector("img.close").src = "./close.svg";

  // remove attribute 'selected'
  project.removeAttribute("selected");

  // clear content from .todo-lists
  let lists = document.getElementById(project.getAttribute("id") + "-lists").remove();

}