import { types, destroy } from "mobx-state-tree";

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
    .views(self => ({
        selectedTodo() {
            return self.todos.find(todo => todo.id === self.selectedTodoId);
        }
    }
    ))
    .actions(store => ({
        setTodos(newTodos) {
            store.todos = newTodos;
        },
        async fetchTodos() {
            const response = await fetch(`${BASE_URL}todos`);
            const data = await response.json();

            const newTodos = data.map(todo => ({
                id: todo.id,
                title: todo.title,
                description: todo.description ? todo.description : ""
            }))
            store.setTodos(newTodos);
        },
        addTodo({ id, title, description }): void {
            store.todos.push({ id, title, description });
        },
        setSelectedTodo(id): void {
            store.selectedTodoId = id;
        },
        async fetchDelete(id) {
            const response = await fetch(`${BASE_URL}todos\\${id}`,
                {
                    method: 'DELETE',
                });

            if (!response.ok) {
                alert("delete failed");
                console.log(666);

                return;
            }

            store.deleteTodo(id);
        },
        deleteTodo(id) {
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