import './style.scss';
import Task from './modules/task.js';
import List from './modules/list.js';
import Project from './modules/project.js';
import Storage from './modules/storage.js';
import { compareAsc, parseISO } from 'date-fns';

const toggleBtn = document.querySelector('header button');
const addNewProject = document.querySelector('.projects .add');
const newProjectPopup = document.querySelector('.add-project-popup');
const submitNewProject = document.querySelector('[data-submit-new-project]');
const projectName = document.getElementById('project-name');
const projects = document.querySelector('.projects .inputs');
const priority = document.getElementById('priority');
const description = document.getElementById('description');
const dueDate = document.getElementById('duedate');
const header = document.querySelector('header');
const main = document.querySelector('main');
const footer = document.querySelector('footer');
const body = document.querySelector('body');
const closeNewProjectBtn = document.querySelector('.cross');
const rightPart = document.querySelector('.right-part');

const storage = new Storage();
const toDoList = storage.getList() || new List();
console.log(toDoList);

toggleBtn.addEventListener('click', () => {
    const nav = document.querySelector('.left-part');
    if (nav.style.display === 'none') {
        nav.style.display = 'block';
    }
    else 
        nav.style.display = 'none';
})

submitNewProject.addEventListener('click', () => {
    if (projectName.value !== '' && priority.value !== '' && dueDate.value !== '') {
        let project = new Project(projectName.value, new Date().getTime(), false, priority.value, description.value, dueDate.value);
        toDoList.addProject(project);
        storage.saveList(toDoList);
        loadPage();
        clearPopupField();
        closeProjectPopup();
    }
})

addNewProject.addEventListener('click', openProjectPopup)

closeNewProjectBtn.addEventListener('click', () => {
    closeProjectPopup();
    clearPopupField();
})

function setNewTaskListeners() {
    const newTaskMenu = document.querySelector('.new-task');
    const addTaskBtn = document.querySelector('.right-part .add');
    const cancelAddNewTaskBtn = newTaskMenu.querySelector('.cancel-task');
    addTaskBtn.addEventListener('click', () => {
        addTaskBtn.setAttribute('data-active', 'false');
        newTaskMenu.style.display = 'block';
    })

    cancelAddNewTaskBtn.addEventListener('click', () => {
        addTaskBtn.setAttribute('data-active', 'true');
        newTaskMenu.style.display = 'none';
    })
}

setNewTaskListeners();


function loadPage() {
    projects.innerHTML = '';
    loadProjects();

    toDoList.projects.forEach(project => {
        let projectElem = document.querySelector(`[data-project-id="${project.id}"]`);
        if(project.isDynamic()) {
            projectElem.addEventListener('click', () => generateRightPageDynamic(projectElem, project));
        } else {
            projectElem.addEventListener('click', () => generateRightPageStatic(projectElem, project));
        }
    })
}

function loadProjects() {
    let highPriorityProjects = organizeSection(1);
    let middlePriorityProjects = organizeSection(2);
    let lowPriorityProjects = organizeSection(3);

    appendProjectSection(highPriorityProjects, 1);
    appendProjectSection(middlePriorityProjects, 2);
    appendProjectSection(lowPriorityProjects, 3);
}

loadPage();

function alreadyAppended(project) {
    let check = document.querySelector(`[data-project-id='${project.id}']`);
    return check;
}

function closeProjectPopup() {
    newProjectPopup.style.display = 'none';
    main.style.filter = header.style.filter = footer.style.filter = "none";
    main.style.pointerEvents = header.style.pointerEvents = footer.style.pointerEvents = 'auto';
    body.style.position = 'static';
}

function openProjectPopup() {
    newProjectPopup.style.display = 'block';
    main.style.filter = header.style.filter = footer.style.filter = "blur(20px)";
    main.style.pointerEvents = header.style.pointerEvents = footer.style.pointerEvents = 'none';
    body.style.position = 'fixed';
    body.style.width = '100%';
}

function clearPopupField() {
    projectName.value = '';
    description.value = '';
    priority.value = '1';
    dueDate.value = '';
}

function appendNewProject(project) {
    let newProject = document.createElement('div');
    newProject.classList.add('elem');
    newProject.setAttribute('data-project-id', project.id);
    newProject.innerHTML = `<i class="fa-solid fa-list"></i><div>${project.name}</div><i class="fa-sharp fa-solid fa-xmark"></i>`;
    let closeBtn = newProject.querySelector('.fa-xmark');
    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toDoList.removeProject(project.id);
        storage.saveList(toDoList);
        loadPage();
        if (project.active)
            generateRightPageDynamic(document.querySelector('[data-project-id="1"]'), toDoList.projects[0]);
    })
    projects.appendChild(newProject);
}

function appendProjectSection(priorityArray, priority) {
    if (priorityArray.length !== 0) {
        appendBar(priorityColor(priority), priority);
        priorityArray.forEach(project => {
            if(!alreadyAppended(project))
                appendNewProject(project);
        })
    } else removeBar(priority);
}

function generateRightPageDynamic(projectElem, project) {
    let projectName = projectElem.querySelector('div').innerText;
    if (project.id === 1) {
        rightPart.innerHTML = `<div class=\"section-title\">${projectName}</div><button class=\"add\" data-active=\"true\"><i class=\"fa-solid fa-plus\"></i><div>Add Task</div></button><div class=\"new-task\"><input type=\"text\" /><button class=\"add-task\">Add</button><button class=\"cancel-task\">Cancel</button></div>`;
    } else {
        let width = rightPart.clientWidth - 50;
        rightPart.innerHTML = `<div class="section-title">${projectName}</div>
        <div class="project-description" style="width:${width}px">
          ${project.description}
        </div>
        <div class="flex">
          <input type="date" name="prjDate" value="${project.dueDate}" />
          <div class="prj-priority" style="background-color: ${priorityColor(project.priority)}"></div>
        </div>
        <div class="priority-picker" data-priority-active="false">
          <div class="high pr" data-priority="1"></div>
          <div class="middle pr" data-priority="2"></div>
          <div class="low pr" data-priority="3"></div>
        </div>
        <button class="add" data-active="true">
          <i class="fa-solid fa-plus"></i>
          <div>Add Task</div>
        </button>
        <div class="new-task">
          <input type="text" /><button class="add-task">Add</button
          ><button class="cancel-task">Cancel</button>
        </div>`


        let priorityElem = document.querySelector('.prj-priority');
        let priorityPicker = document.querySelector('.priority-picker');
        priorityElem.addEventListener('click', () => {
            if (priorityPicker.getAttribute('data-priority-active') === 'false'){
                priorityPicker.style.display = "inline-flex";
                priorityPicker.setAttribute('data-priority-active', 'true');
            } else {
                priorityPicker.style.display = "none";
                priorityPicker.setAttribute('data-priority-active', 'false');
            }
        })

        let priorityInputChoices = [...document.querySelectorAll('.pr')];
        priorityInputChoices.forEach(choice => {
            choice.addEventListener('click', (e) => {
                project.priority = Number(e.target.getAttribute('data-priority'));
                storage.saveList(toDoList);
                document.querySelector('.prj-priority').style.backgroundColor = priorityColor(project.priority);
                priorityPicker.style.display = "none";
                priorityPicker.setAttribute('data-priority-active', 'false');
                loadPage();
            })
        })

        let changeDueDate = document.querySelector('.flex input');
        changeDueDate.addEventListener('change', () => {
            project.dueDate = changeDueDate.value;
            storage.saveList(toDoList);
            loadPage();
        })
    }
    setNewTaskListeners();
    toDoList.projects.forEach(nonActiveProject => {
        nonActiveProject.active = false;
        let prElem = document.querySelector(`[data-project-id='${nonActiveProject.id}']`);
        if (prElem.classList.contains('active'))
            prElem.classList.remove('active');
    });
    project.active = true;
    projectElem.classList.add('active');
}

function generateRightPageStatic(projectElem, project) {
    rightPart.innerHTML = `<div class="section-title">${project.name}</div>`;
    toDoList.projects.forEach(nonActiveProject => {
        nonActiveProject.active = false;
        let prElem = document.querySelector(`[data-project-id='${nonActiveProject.id}']`);
        if (prElem.classList.contains('active'))
            prElem.classList.remove('active');
    });
    project.active = true;
    projectElem.classList.add('active');
}

function priorityColor(priority){
    let array = ['rgb(227, 28, 28)', 'rgb(255, 255, 69)', 'rgb(0, 202, 0)'];
    return array[priority - 1];
}

function appendBar(color, number) {
    let newBar = document.createElement('div');
    newBar.classList.add('bar');
    newBar.setAttribute('data-bar-index', `${number}`)
    newBar.style.backgroundColor = color;
    if (!document.querySelector(`[data-bar-index='${number}']`))
        projects.appendChild(newBar);
}

function removeBar(number) {
    let bar = document.querySelector(`[data-bar-index="${number}"]`)
    if (bar !== null)
        bar.remove();
}

function organizeSection(priority) {
    return toDoList.projects.filter(project => project.priority === priority).sort((a, b) => {
        return compareAsc(parseISO(a.dueDate), parseISO(b.dueDate));
    });
}