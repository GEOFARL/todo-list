export default class Task {
    constructor(name, dueDate = 'No date') {
        this.name = name;
        this.dueDate = dueDate;
    }
}