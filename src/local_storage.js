import { projects, Project } from "./project";
import { displayNewProject } from "./disp-project";

function unpack(data) {
  // function to unpack the local storage
  let p = JSON.parse(data);
  let count = 0;

  for (let key in p) {
    if (p.hasOwnProperty(key)) {
      count++;
      let pInstance = new Project(p[key].name);
      pInstance.loadProject(p[key].progress, p[key].toDoLists, p[key].path);
      projects[key] = pInstance;
      displayNewProject(pInstance);
    }
  }

//   console.log("downloaded " + count + " projects");
}

export function replacer(key, value) {
  if (key === "progress_element" || key === "progress_bar") {
    return Object.keys(key);
  }
  return value;
}

export function uploadData(){
    // // go through each list in each project and set toDoItems to {}
    // for(let key in projects){
    //     if(projects.hasOwnProperty(key)){
    //         for(let list in projects[key].toDoLists){
    //             if(projects[key].toDoLists.hasOwnProperty(list)){
    //                 projects[key].toDoLists[list].toDoItems = {};
    //             }
    //         }
    //     }
    // }
    localStorage.setItem("projects", JSON.stringify(projects, replacer));
}

export function downloadData(){
    // console.log('downloading data');
    unpack(localStorage.getItem("projects"));
}