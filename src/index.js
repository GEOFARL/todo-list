import './style.scss';

const toggleBtn = document.querySelector('header button');
const addNewProject = document.querySelector('.projects .add');
const newProjectPopup = document.querySelector('.add-project-popup');
const header = document.querySelector('header');
const main = document.querySelector('main');
const footer = document.querySelector('footer');
const body = document.querySelector('body');
const closeNewProjectBtn = document.querySelector('.cross');
const inbox = document.querySelector('.inbox');
const today = document.querySelector('.today');
const thisWeek = document.querySelector('.this-week');
const rightPart = document.querySelector('.right-part');
const inputTypes = document.querySelectorAll('.inputs .elem');

toggleBtn.addEventListener('click', () => {
    const nav = document.querySelector('.left-part');
    if (nav.style.display === 'none') {
        nav.style.display = 'block';
    }
    else 
        nav.style.display = 'none';
})

addNewProject.addEventListener('click', () => {
    newProjectPopup.style.display = 'block';
    main.style.filter = header.style.filter = footer.style.filter = "blur(20px)";
    main.style.pointerEvents = header.style.pointerEvents = footer.style.pointerEvents = 'none';
    body.style.position = 'fixed';
    body.style.width = '100%';
})

closeNewProjectBtn.addEventListener('click', () => {
    newProjectPopup.style.display = 'none';
    main.style.filter = header.style.filter = footer.style.filter = "none";
    main.style.pointerEvents = header.style.pointerEvents = footer.style.pointerEvents = 'auto';
    body.style.position = 'static';
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

inbox.addEventListener('click', (e) => {
    rightPart.innerHTML = "<div class=\"section-title\">Inbox</div><button class=\"add\" data-active=\"true\"><i class=\"fa-solid fa-plus\"></i><div>Add Task</div></button><div class=\"new-task\"><input type=\"text\" /><button class=\"add-task\">Add</button><button class=\"cancel-task\">Cancel</button></div>";
    setNewTaskListeners();
    inputTypes.forEach(type => {
        if (type.classList.contains('active'))
            type.classList.remove('active');
    })
    e.currentTarget.classList.add('active');
})

today.addEventListener('click', (e) => {
    rightPart.innerHTML = '<div class="section-title">Today</div>';
    inputTypes.forEach(type => {
        if (type.classList.contains('active'))
            type.classList.remove('active');
    })
    e.currentTarget.classList.add('active');
})

thisWeek.addEventListener('click', (e) => {
    rightPart.innerHTML = '<div class="section-title">This Week</div>';
    inputTypes.forEach(type => {
        if (type.classList.contains('active'))
            type.classList.remove('active');
    })
    e.currentTarget.classList.add('active');
})