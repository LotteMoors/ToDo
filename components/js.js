const todoInput = document.querySelector('.todo-input')
const sDate = document.querySelector('.datepicker-input')
const todoBtn = document.querySelector('.todo-button')
const todoList = document.querySelector('.todo-list')
const searchInput = document.querySelector('#search')
const clearAll = document.querySelector('#deleteAll')
const checkAll = document.querySelector('#checkAll')
const completeAll = document.querySelector('#cofirmAll')
const filterOption = document.querySelector('.filter-todo')
let itemsArray = localStorage.getItem('todos', todoInput.value) ? JSON.parse(localStorage.getItem('todos', todoInput.value)) : [];
const data = JSON.parse(localStorage.getItem('todoInput'));
// localStorage.setItem('todoInput', JSON.stringify(itemsArray));


sDate.addEventListener('click', addDate);
todoBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);


function addDate(e) {
    const selectDate = document.createElement('div');
    sDate.appendChild(selectDate);

}

function addTodo(todo) {
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");

    const newTodo = document.createElement('li');
    newTodo.innerText = `${sDate.value}   :    ${todoInput.value}`;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    const completedBtn = document.createElement('button');
    completedBtn.innerHTML = '<i class="fa fa-check" aria-hidden="true"></i>';
    completedBtn.classList.add('complete-btn');
    todoDiv.appendChild(completedBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
    deleteBtn.classList.add("delete-btn");
    todoDiv.appendChild(deleteBtn);

    todoList.appendChild(todoDiv);

    const x = todoInput.value;
    if (todoInput.value == "") {
        todoDiv.style.display = "none";
        return false;
    }    
}

todoBtn.addEventListener('click', function (e) {
    e.preventDefault();

    itemsArray.push(todoInput.value);
    localStorage.setItem('todo', JSON.stringify(itemsArray));
    todoInput.value = "";
    sDate.value = "";
})


clearAll.addEventListener('click', function (e) {
    localStorage.clear();
    console.log(todoList.firstElementChild)
    while (todoList.firstElementChild != null) {
        todoList.removeChild(todoList.firstElementChild)
    }
})

checkAll.addEventListener('click', function (e) {
    todoList.classList.toggle('completed');
    
})



function deleteCheck(e) {
    const item = e.target;

    if (item.className === "delete-btn") {
        const todo = item.parentElement;
        todo.classList.add("fall");
        todo.addEventListener('transitionend', function () {
            todo.remove();
        })
    }
    if (item.className === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}

searchInput.addEventListener('keyup', e => {
    let search = searchInput.value    
    const todos = todoList.childNodes;

    todos.forEach(function (todo)  {
        for( let i = 0 ; i < todos.length ; i ++){
            if(todos[i].innerHTML.includes(search)){
                todos[i].style.display="flex"; 
            } 
            else { 
                todos[i].style.display="none"; 
            }
        }
    })

})