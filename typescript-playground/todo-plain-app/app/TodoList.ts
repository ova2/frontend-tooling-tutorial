import {Todo} from './Todo';

export class TodoList {
    private todos: Todo[];

    constructor() {
        this.todos = [];
    }

    add(text: string): string {
        this.todos.push(new Todo(text));
        return this.render();
    }

    remove(index: number): string {
        this.todos.splice(index, 1);
        return this.render();
    }

    done(index: number): string {
        this.todos[index].done = true;
        return this.render();
    }

    filter(): string {
        let todos: Todo[] = this.todos.filter((todo: Todo) => !todo.done);
        return this.render(todos);
    }

    showAll() {
        return this.render();
    }

    private render(todos: Todo[] = this.todos): string {
        let html: string = ``;
        let length: number = todos.length;
        if (length > 0) {
            html = html + `<ul>`;
        }

        for (let i = 0; i < length; i++) {
            let todo = todos[i];
            html = html + `
                <li>
                    <span class="${todo.done ? 'todo-done' : ''}">${todo.text}</span>
                    <input type="checkbox" data-action="done" data-index="${i}" ${todo.done ? 'checked' : ''}>
                        ${todo.done ? 'Done' : 'Open'}
                    </input>
                    <a href="#" data-action="delete" data-index="${i}">Delete</a>
                </li>`;
        }

        if (length > 0) {
            html = html + `</ul>`;
        }

        return html;
    }
}
