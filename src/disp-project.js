import { Project } from "./project.js";

export function newProj_popup(){
    console.log("newProj_popup")
    // create popup
    let popup = document.createElement("div");
    popup.id = "popup";
    let popupInput = document.createElement("input");
    popupInput.id = "popup-input";
    let popupButton = document.createElement("button");
    popupButton.id = "popup-button";
    popupButton.innerHTML = "Create";

    let inputDiv = document.createElement("div");
    inputDiv.id = "input-div";
    inputDiv.appendChild(popupInput);
    inputDiv.appendChild(popupButton);
    let inputTitle = document.createElement("span");
    inputTitle.id = "input-title";
    inputTitle.innerHTML = "Project Name:";

    popup.appendChild(inputTitle);
    popup.appendChild(inputDiv);
    document.body.appendChild(popup);

    popupButton.addEventListener("click", function () {
        let proj = new Project(popupInput.value);
        removePopup();
        displayNewProject(proj);
    });
}

function removePopup(){
    let popup = document.getElementById("popup");
    popup.parentNode.removeChild(popup);
}

function displayNewProject(project) {
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

  // add event listener
  projTitle.addEventListener("click", actionProject);

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