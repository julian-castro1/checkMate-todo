import { projects, Project } from "./project";
import { updateProgress } from "./todo_item";

export let currSelectedList = null;

export function listTitleClickHandler(event) {
  let list = event.target;
  let list_id = event.currentTarget.getAttribute("id");
  let project_id = event.currentTarget.parentElement.getAttribute("id").split("-")[0];
  console.log("list path: " + projects[project_id].toDoLists[list_id].path);

  if(list.classList.contains("list-icon")){
    let list_id = list.parentElement.getAttribute("id");
    let project_id = list.parentElement.parentElement.getAttribute("id").split("-")[0];
    // check if the list was already complete
    if(list.src.includes("incomplete")){
        // mark the list as complete
        list.src = "./complete.svg";
        // strike through the list title
        list.parentElement.classList.add("strikethrough");

        projects[project_id].toDoLists[list_id].complete = true;
        projects[project_id].toDoLists[list_id].progress = 1;
        projects[project_id].updateProgress();
    } else {
        // remove the strikethrough
        list.parentElement.classList.remove("strikethrough");
        // the list was already complete, mark it as incomplete
        list.src = "./incomplete.svg";
        projects[project_id].toDoLists[list_id].complete = false;
        projects[project_id].toDoLists[list_id].updateProgress();
        projects[project_id].updateProgress();
    }
  } else {
    // the title was clicked, display the list on the main screen
    // select the list
    let list_id = list.getAttribute("id");
    let project_id = list.parentElement.getAttribute("id").split("-")[0];

    // remove 'selected' from all other lists
    let lists = document.querySelectorAll(".todo-list-container");
    for (let i = 0; i < lists.length; i++) {
      if (lists[i].getAttribute("id") !== list_id) {
        lists[i].removeAttribute("selected");
      }
    }

    event.currentTarget.setAttribute("selected", "true");
    currSelectedList = event.currentTarget.getAttribute("id");
  }
}

export function eraseToDoScreen() {
  let toDoScreen = document.getElementById("main");
  toDoScreen.innerHTML = "";
}