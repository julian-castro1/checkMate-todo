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
      pInstance.loadProject(p[key].progress, p[key].toDoLists);
      projects[key] = pInstance;
      displayNewProject(pInstance);
    }
  }

  console.log("downloaded " + count + " projects");
}


function pack(){
    // function to pack the local storage
    let p = JSON.stringify(projects);
    console.log("uploaded projects");
    return p;
}

export function uploadData(){
    localStorage.setItem("projects", pack());
}

export function downloadData(){
    console.log('downloading data');
    unpack(localStorage.getItem("projects"));
}