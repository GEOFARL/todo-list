import List from "./list";
import Project from "./project";

export default class Storage {
    constructor() {
        this.listKey = 'listOfProjects'
    }

    saveList(list) {
        localStorage.setItem(this.listKey, JSON.stringify(list));
    }

    getList() {
        let list = JSON.parse(localStorage.getItem(this.listKey));
        list = Object.assign(new List(), list);
        list.projects = list.projects.map(project => {
            project = Object.assign(new Project(), project);
            return project;
        })
        return list;
    }
}