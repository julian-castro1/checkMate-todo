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

  console.log("downloaded " + count + " projects");
}

export function replacer(key, value) {
  if (key === "progress_element") {
    return Object.keys(key);
  }
  return value;
}

export function uploadData(){
    localStorage.setItem("projects", JSON.stringify(projects, replacer));
}

export function downloadData(){
    console.log('downloading data');
    unpack(localStorage.getItem("projects"));
}