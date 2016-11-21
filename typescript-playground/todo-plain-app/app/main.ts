import {TodoList} from './TodoList';

const todosContaner: HTMLElement = document.getElementById('todosContaner');
const addText: HTMLInputElement = document.getElementById('addText') as HTMLInputElement;
const addBtn: HTMLElement = document.getElementById('addBtn');
const filterBtn: HTMLElement = document.getElementById('filterBtn');
const showAllBtn: HTMLElement = document.getElementById('showAllBtn');

let todoList: TodoList = new TodoList();

todosContaner.addEventListener('click', (event: MouseEvent) => {
    const target = <HTMLElement>event.target;
    let idx: number = +target.getAttribute('data-index');

    if (target.dataset['action'] === 'done') {
        todosContaner.innerHTML = todoList.done(idx);
    } else if (target.dataset['action'] === 'delete') {
        todosContaner.innerHTML = todoList.remove(idx);
    }
});

addBtn.addEventListener('click', () => {
    todosContaner.innerHTML = todoList.add(addText.value);
});

filterBtn.addEventListener('click', () => {
    todosContaner.innerHTML = todoList.filter();
});

showAllBtn.addEventListener('click', () => {
    todosContaner.innerHTML = todoList.showAll();
});