import {Todo} from "../classes"
import { todoList } from "../index"

// referencias al html:
const divTodoList = document.querySelector(".todo-list");
const txtInput = document.querySelector(".new-todo");
const btnBorrar = document.querySelector(".clear-completed");
const ulFilters = document.querySelector(".filters")
const anchorFiltros = document.querySelectorAll(".filtro")


export const crearTodoHtml = (todo) => {
    const htmlTodo = `
    <li class="${todo.completado ? "completed" : ""}" data-id="${todo.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${
                todo.completado ? "checked" : ""
            }>
            <label>${todo.tarea}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;

    const div = document.createElement("div");
    div.innerHTML = htmlTodo;

    divTodoList.append(div.firstElementChild);
    return div;
};

// eventos:
txtInput.addEventListener("keyup", (event) => {
    if (event.keyCode === 13 && txtInput.value.length > 0) {
        console.log(txtInput.value);
        const nuevoTodo = new Todo(txtInput.value);
        todoList.nuevoTodo(nuevoTodo);

        console.log(todoList);
        crearTodoHtml(nuevoTodo);
        txtInput.value = '';
    }
});

divTodoList.addEventListener('click', (event) => {
    const nombreElemento = event.target.localName; // input, label, button
    const todoElemento = event.target.parentElement.parentElement; // selecciona el <li></li>
    const todoId = todoElemento.getAttribute('data-id'); // el id del atributo data-id
    if (nombreElemento.includes('input')) {
        todoList.marcarCompletado(todoId);
        todoElemento.classList.toggle('completed'); // al dar click en el checkbox cambia de completed a false y viceversa
    } else if (nombreElemento.includes('button')) { // hay que borrar el todo
        todoList.eliminarTodo(todoId);
        divTodoList.removeChild(todoElemento);
    }
})


btnBorrar.addEventListener('click', () => {
    todoList.eliminarCompletados();
    for(let i = divTodoList.children.length -1; i>=0; i--) {
        const elemento = divTodoList.children[i]
        if (elemento.classList.contains('completed')) { // tiene la clase completed
            divTodoList.removeChild(elemento);
        }
    }
})

ulFilters.addEventListener('click', (event) => {
    // console.log(event.target.text); // Pendientes, Completados, Todos
    const filtro = event.target.text;
    if (!filtro) return;

    anchorFiltros.forEach(elem => elem.classList.remove('selected'));
    event.target.classList.add('selected');

    for (const elemento of divTodoList.children) {
        // console.log(elemento)
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');
        
        switch (filtro) {
            case 'Pendientes':
                if(completado) {
                    elemento.classList.add('hidden');
                }
                break;
            case 'Completados':
                if(!completado) {
                    elemento.classList.add('hidden');
                }
                break;
        }
    }

})