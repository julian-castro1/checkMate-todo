import { projects, Project } from "./project";
import { toDoList } from "./todo_list.js";
import ProgressBar from "progressbar.js";
import { updateProgress } from "./todo_item";
import main from "progressbar.js";
import { nameToId } from "./index.js";
import { addItem } from "./todoList_controller";
import { toDoItem } from "./todo_item";
const { differenceInDays, parseISO, set } = require('date-fns');

export let currSelectedList = null;

export function listTitleClickHandler(event) {
  let list = event.target;
  let list_id = event.currentTarget.getAttribute("id");
  let project_id = event.currentTarget.parentElement.getAttribute("id").split("_")[0];
//   console.log("list path: " + projects[project_id].toDoLists[list_id].path);

  if(list.classList.contains("list-icon")){
    let list_id = list.parentElement.getAttribute("id");
    let project_id = list.parentElement.parentElement.getAttribute("id").split("_")[0];
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
    eraseToDoScreen();
    // the title was clicked, display the list on the main screen
    // select the list
    let list_id = event.currentTarget.getAttribute("id");
    let project_id = event.currentTarget.parentElement.getAttribute("id").split("_")[0];

    // remove 'selected' from all other lists
    let lists = document.querySelectorAll(".todo-list-container");
    for (let i = 0; i < lists.length; i++) {
      if (lists[i].getAttribute("id") !== list_id) {
        lists[i].removeAttribute("selected");
      }
    }

    // find toDoList object in projects and display it
    let listInstance = projects[project_id].toDoLists[list_id];
    drawToDoScreen(listInstance);

    event.currentTarget.setAttribute("selected", "true");
    currSelectedList = event.currentTarget.getAttribute("id");
  }
}

export function drawToDoScreen(list) {
  let path_ele = document.createElement("span");
  let titlebar_ele = document.createElement("div");
  let title_ele = document.createElement("span");
  let titleProgress_ele = document.createElement("div");
  let divider_ele = document.createElement("div");
  let listItems_ele = document.createElement("div");
  let noItems_ele = document.createElement("span");
  let percentage = document.createElement("span");

  percentage.id = "page-progress";
  path_ele.id = "path";
  titlebar_ele.id = "titlebar";
  title_ele.id = "title";
  titleProgress_ele.id = "title-progress";
  divider_ele.id = "divider";
  listItems_ele.id = "list-items";
  noItems_ele.id = "no-items";

  path_ele.innerHTML = "test >> path";
  title_ele.innerHTML = list.name;
  noItems_ele.innerHTML = "No Items";
  let percent = list.progress * 100 >= 1 ? Math.floor(list.progress * 100) : 0;
  percentage.innerHTML = percent + "%";

  titlebar_ele.appendChild(title_ele);
  titlebar_ele.appendChild(titleProgress_ele);
  titlebar_ele.appendChild(percentage);
  if (Object.keys(list.toDoItems).length === 0) {
    listItems_ele.appendChild(noItems_ele);
  }

  let main_ele = document.getElementById("main");
  // main_ele.appendChild(path_ele);
  main_ele.appendChild(titlebar_ele);
  main_ele.appendChild(divider_ele);
  main_ele.appendChild(listItems_ele);
  

  let line = new ProgressBar.Line("#title-progress", {
    strokeWidth: 10,
    easing: "easeInOut",
    duration: 500,
    color: "#3aa445",
    trailColor: "#545454",
    trailWidth: 15,
    svgStyle: { width: "100%", height: "100%" },
  });
  list.progress_bar = line;
  line.animate(list.progress); // Value from 0.0 to 1.0


  // if its empty, remove message
    if (Object.keys(list.toDoItems).length === 0) {
        listItems_ele.innerHTML = "";
    }
  // draw all items
    for(let key in list.toDoItems){
        if(list.toDoItems.hasOwnProperty(key)){
            // remove lists with name: test_tiem, no way this works, and woah
            //   if(key === "test_tiem" || key === "no way this works" || key === "woah"){
            //       delete list.toDoItems[key];
            //   }
          drawItem(list.toDoItems[key]);
        }
    }


  // draw button to add new item
  let addItemContainer = document.createElement("div");
    addItemContainer.id = "add-item-container";
    let addItemButton = document.createElement("button");
    addItemButton.id = "add-item-button";
    addItemButton.innerHTML = "+";
    addItemButton.addEventListener("click", drawNewItemPopup);
    addItemContainer.appendChild(addItemButton);
    main_ele.appendChild(addItemContainer);
}
export function addItemHandler(listInfo){
    // create item

    projects[listInfo.project_id].toDoLists[listInfo.list_id].toDoItems[nameToId(listInfo.name)] = new toDoItem(listInfo);
    let item = projects[listInfo.project_id].toDoLists[listInfo.list_id].toDoItems[nameToId(listInfo.name)];
    // draw item
    drawItem(item);
}
function drawItem(item){
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

    

    // console.log("********** NEW ITEM DEBUG **********")
    // console.log("item name: " + item.name);
    // console.log("item complete: " + item.complete);
    // console.log("item progress: " + item.progress);
    // console.log("item due date: " + item.dueDate);
    // console.log("item priority: " + item.priority);
    // console.log("item path: " + item.path);
    // console.log("items complete: " + item.itemsComplete);
    // console.log("items total: " + item.itemsTotal);
    // console.log("Date conversion" + parseISO(item.dueDate));
    // console.log("Date difference: " + differenceInDays(parseISO(item.dueDate), new Date()));
    // console.log("********** END ITEM DEBUG **********")


    if(item.complete){
        icon.src = "./complete.svg";
        itemName.classList.add("strikethrough");
    } else { 
        icon.src = "./incomplete.svg";
    }
    itemName.innerHTML = item.name;
    progressComplete.innerHTML = item.itemsComplete;
    slash.innerHTML = "/";
    progressTotal.innerHTML = item.totalItems;
    daysLeft.innerHTML = differenceInDays(parseISO(item.dueDate), new Date());
    dueDateText.innerHTML = " days";
    priorityText.innerHTML = item.priority;
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
    // console.log("item path: " + item.path);
    todoItem.setAttribute("id", item.path);

    document.getElementById("list-items").appendChild(todoItem);

    // add event listener to item
    todoItem.addEventListener("click", actionItem);
      todoItem.addEventListener("contextmenu", function (ev) {
        ev.preventDefault();
        if (confirm("Delete List Item?")) {
          let path = ev.currentTarget.getAttribute("id").split("/");
          let project_id = path[0];
          let list_id = path[1];
          let item_id = path[2];
        // console.log("item id: " + item_id);
          projects[project_id].toDoLists[list_id].deleteListItem(item_id);
          document.getElementById("list-items").removeChild(ev.currentTarget);
        }
      });

    // remove elements that arent being used
    if(!item.dueDate){
        dueDate.style.opacity = "0";
    }
    if(!item.priority){
        priority.style.opacity = "10%";
    }

    // set appropriate priority color
    setPriorityColor(item.priority, priority);
}
function actionItem(e){
    let listItem = e.currentTarget;
    let icon_clicked = e.target === listItem.children[0];

    if(icon_clicked){
        // define path
        let path = listItem.getAttribute("id").split("/");
        let project_id = path[0];
        let list_id = path[1];
        let item_id = path[2];

        // determine whether to mark item as complete or incomplete
        if(listItem.children[0].getAttribute("src") == "./complete.svg"){
            listItem.children[0].src = "./incomplete.svg";
            projects[project_id].toDoLists[list_id].toDoItems[item_id].complete = false;
            listItem.children[1].classList.remove("strikethrough");
        } else {
            listItem.children[0].src = "./complete.svg";
            projects[project_id].toDoLists[list_id].toDoItems[item_id].complete = true;
            listItem.children[1].classList.add("strikethrough");
        }

        // update progress in list
        updateEverything(project_id, list_id, item_id);
    } else {
        // expand or collapse the item
        if(listItem.hasAttribute("selected")){}
    }
}

function updateEverything(proj_id, list_id, item_id){
    projects[proj_id].toDoLists[list_id].updateProgress();
    projects[proj_id].updateProgress();
    updateSidebarListProgress(proj_id, list_id);
    document.getElementById("page-progress").innerHTML =
    Math.floor(projects[proj_id].toDoLists[list_id].progress * 100) + "%";
}
function updateSidebarListProgress(proj_id, list_id){
    let list_ele = document.getElementById(list_id);
    if(projects[proj_id].toDoLists[list_id].complete){
        list_ele.classList.add("strikethrough");
        list_ele.children[0].src = "./complete.svg";
    } else {
        list_ele.classList.remove("strikethrough");
        list_ele.children[0].src = "./incomplete.svg";
    }
}
function setPriorityColor(priority, priorityEle){
    priorityEle.style.opacity = "50%";
    switch(priority){
        case "1": priorityEle.style.backgroundColor = "#DC5C5C"; break;
        case "2": priorityEle.style.backgroundColor = "#DC925C"; break;
        case "3": priorityEle.style.backgroundColor = "#DCCF5C"; break;
        case "4": priorityEle.style.backgroundColor = "#A4DC5C"; break;
        case "5": priorityEle.style.backgroundColor = "#5FDC5C"; break;
    }
}
function drawNewItemPopup(){
    if(document.getElementById("new-item-popup") !== null){
        // popup already exists

        // verify info
        let listInfo = {};
        listInfo['name'] = document.getElementById("new-item-name").value;
        listInfo['dueDate'] = document.getElementById("new-item-due-date").value;
        listInfo['priority'] = document.getElementById("new-item-priority").value;

        if(listInfo['name'] === ""){ alert("Please enter a name"); return; }
        // ensure nothing else has same ID
        if(document.getElementById(nameToId(listInfo['name'])) !== null){
            alert("Cannot use duplicate names");
            return;
        }
        // check for checklist item duplicates
        if(currSelectedList !== null){
            listInfo['list_id'] = currSelectedList;
            listInfo['project_id'] = document.getElementById(currSelectedList).parentElement.getAttribute("id").split("_")[0];
            if(projects[listInfo['project_id']].toDoLists[listInfo['list_id']].toDoItems.hasOwnProperty(nameToId(listInfo['name']))){
                alert("Item already exists");
                return;
            }
        } else {
            alert("Please select a list");
            return;
        }
        
        listInfo['path'] = listInfo.project_id + "/" + listInfo.list_id + "/" + nameToId(listInfo['name']);
        addItemHandler(listInfo);

        // remove popup
        document.getElementById("new-item-popup").remove();
        document.getElementById("add-item-container").style.backgroundColor = "transparent";
    } else {
        document.getElementById("add-item-container").style.backgroundColor = "#2D2D2D";
        // includes a name, due date, and priority (1-5)
        let popup = document.createElement("div");
        popup.id = "new-item-popup";
        // popup.classList.add("new-item");
        let name = document.createElement("input");
        name.id = "new-item-name";
        name.classList.add("new-item");
        name.placeholder = "Name";
        let dueDate = document.createElement("input");
        dueDate.id = "new-item-due-date";
        dueDate.type = "date";
        dueDate.classList.add("new-item");
        dueDate.placeholder = "Due Date";
        let priority = document.createElement("input");
        priority.id = "new-item-priority";
        priority.classList.add("new-item");
        priority.placeholder = "1-5";
        let submit = document.createElement("button");
        submit.classList.add("new-item");
        submit.id = "new-item-submit";
        submit.innerHTML = "Add Item";
        submit.addEventListener("click", submitNewItem);
        popup.appendChild(name);
        popup.appendChild(dueDate);
        popup.appendChild(priority);
        // popup.appendChild(submit);
        document.getElementById("add-item-container").insertBefore(popup, document.getElementById("add-item-button"));
    }
}
function submitNewItem(){

}
export function eraseToDoScreen() {
  let toDoScreen = document.getElementById("main");
  toDoScreen.innerHTML = "";
}

export function updateListProgress(){
    let percent = list.progress * 100 >= 1 ? Math.floor(list.progress * 100) : 0;
    percentage.innerHTML = percent + "%";
}