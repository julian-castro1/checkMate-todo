import { Project } from "./project.js";

export function new_popup(ele){
    let proj = ele.currentTarget;
    console.log("new_popup called for: " + proj);
    // create popup
    let popup = document.createElement("div");
    popup.id = "popup";
    let popupInput = document.createElement("input");
    popupInput.id = "popup-input";
    popupInput.placeholder = "Project Name";
    let popupButton = document.createElement("button");
    popupButton.id = "popup-button";
    popupButton.innerHTML = "Create";


    popup.appendChild(popupInput);
    popup.appendChild(popupButton);

    document.body.appendChild(popup);

    popupButton.addEventListener("click", function () {
        if(!Project.duplicateProject(popupInput.value)){
            let proj = new Project(popupInput.value);
            displayNewProject(proj);
            removePopup();
        } else {
            alert("Cannot create duplicate project");
        }
    });

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
    let projLists = document.createElement("div");
    projLists.classList.add("todo-lists");
    newProj.appendChild(projLists);

  // append the new project div to the sidebar
  sidebar.appendChild(newProj);
}

function actionProject(e) {
  let ele = e.currentTarget;
  let project = ele.parentNode;
  if (project.getAttribute("selected") === "true") {
    // collapse the project
    collapseProject(project);
  } else {
    // expand the project
    expandProject(project);
    // collapse project if another project is open and change selected to false
    let projects = document.getElementsByClassName("project");
    for (let i = 0; i < projects.length; i++) {
      if (projects[i].getAttribute("selected") === "true") {
        collapseProject(projects[i]);
      }
    }
    project.setAttribute("selected", "true");
  }
}

function expandProject(project) {
  // expand the project
  let projectTitle = project.querySelector(".proj-title");
  projectTitle.querySelector("img.close").src = "./open.svg";
}

function collapseProject(project) {
  // collapse the project
  project.querySelector("img.close").src = "./close.svg";

  // remove attribute 'selected'
  project.removeAttribute("selected");

  // clear content from .todo-lists
  let lists = project.querySelector(".todo-lists");
  lists.innerHTML = "";
}