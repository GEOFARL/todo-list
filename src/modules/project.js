export default class Project {
    constructor(name, id, active, priority = 1, description = '', dueDate = 'none') {
        this.id = id;
        this.active = active;
        this.name = name;
        this.priority = Number(priority);
        this.description = description;
        this.dueDate = dueDate;
        this.tasks = [];
    }

    isDynamic() {
        let staticProjects = ['Today', 'This week'];
        return !staticProjects.includes(this.name);
    }
    
    addTask(task) {
        this.tasks.push(task);
    }

    removeCheckedTasks() {
        this.tasks = this.tasks.filter(task => task.checked === false);
    }
}