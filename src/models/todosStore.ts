import { types, destroy } from "mobx-state-tree";

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
            return self.todos.filter(todo => todo.id === self.selectedTodoId);
        }
    }
    ))
    .actions(store => ({
        setTodos(newTodos) {
            store.todos = newTodos;
        },
        async fetchTodos() {
            const response = await fetch('../../assets/mockServer.json');
            const data = await response.json();
            const newTodos = data.todos.map(todo => ({
                id: todo.id,
                title: todo.title,
                description: todo.description
            }))

            //store.setTodos(newTodos);
        },
        addTodo({ id, title, description }): void {
            store.todos.push({ id, title, description });
        },
        setSelectedTodo(id): void {
            store.selectedTodoId = id;
        },
        deleteTodo(id): void {
            const todo = store.todos.find(todo => todo.id === id);
            if (todo) destroy(todo);
        }
    }));

let todosStore;
export const useTodosStore = () => {
    if (!todosStore)
        todosStore = TodosStore.create({
            todos: [
                { id: "1", title: "Feed dog" },
                { id: "2", title: "Go for walk" },
                { id: "3", title: "Write essay", description: "- electric -water" },
            ],
            selectedTodoId: "3",
        });

    return todosStore;
};