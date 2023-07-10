import "./styles.css";
import "material-design-icons/iconfont/material-icons.css";


buildHomePage();

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

    // projects
    createInitialProject();
    
    buildProjects();
    buildToDoList();
    buildToDoItems();
    buildChecklists();


}

function createInitialProject(){

}