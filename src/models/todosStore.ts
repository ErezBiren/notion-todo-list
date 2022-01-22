import { types, destroy } from "mobx-state-tree";
import axios from 'axios';

const BASE_URL = 'http://localhost:3000/';

export const TodoModel = types
    .model("Todo", {
        id: types.string,
        title: types.string,
        description: "",
        finished: false
    })
    .actions(store => ({
        toggle() {
            store.finished = !store.finished;
        }
    }));

export const TodosStore = types
    .model("TodoStore", {
        todos: types.array(TodoModel),
        selectedTodoId: types.maybeNull(types.string)
    })
    .views(store => ({
        selectedTodo() {
            return store.todos.find(todo => todo.id === store.selectedTodoId);
        }
    }
    ))
    .actions(store => ({
        setTodos(newTodos) {
            store.todos = newTodos;
        },
        async fetchTodos() {
            const response = await axios.get(`${BASE_URL}todos`);
            const data = await response.data;

            const newTodos = data.map(todo => ({
                id: todo.id,
                title: todo.title,
                description: todo.description ? todo.description : ""
            }))
            store.setTodos(newTodos);
        },
        async addTodo(todo) {

            const response = await axios.post(`${BASE_URL}todos/`, todo);

            if (response.status !== 201) {
                alert("add failed");
                return;
            }

            store.addTodoToStore(todo);
        },
        addTodoToStore(todo) {
            store.todos.push(todo);
        },
        setSelectedTodo(id): void {
            store.selectedTodoId = id;
        },
        async update(updatedTodo) {

            const response = await axios.put(`${BASE_URL}todos\\${updatedTodo.id}`, updatedTodo)

            if (response.status != 200) {
                alert("update failed");
                return;
            }

            store.updateTodoInStore(updatedTodo);
        },
        updateTodoInStore(updatedTodo) {
            let todo = store.todos.find(todo => todo.id === updatedTodo.id);
            todo = { ...updatedTodo };
        },
        async fetchDelete(id) {

            const response = await axios.delete(`${BASE_URL}todos\\${id}`);

            console.log(response.status);

            if (response.status !== 200) {
                alert("delete failed");
                return;
            }

            store.deleteTodoFromStore(id);
        },
        deleteTodoFromStore(id) {
            const todo = store.todos.find(todo => todo.id === id);
            if (todo) destroy(todo);
        }
    }));

let todosStore;
export const useTodosStore = () => {
    if (!todosStore)
        todosStore = TodosStore.create({
            todos: [],
            selectedTodoId: "",
        });

    return todosStore;
};