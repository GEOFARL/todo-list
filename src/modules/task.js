export default class Task {
    constructor(name, dueDate = 'No date', checked = false)  {
        this.name = name;
        this.dueDate = dueDate;
        this.checked = checked;
    }
}