import Project from "./project.js";

export default class List {
    constructor() {
        this.projects = [];
        this.projects.push(new Project('Inbox', 1, true, 4));
        this.projects.push(new Project('Today', 2, false, 4));
        this.projects.push(new Project('This week', 3, false, 4));
    }

    addProject(project) {
        this.projects.push(project);
    }

    removeProject(id) {
        this.projects.splice(this.projects.findIndex(project => project.id === id), 1);
    }
}