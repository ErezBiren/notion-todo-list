import { types, destroy, flow } from "mobx-state-tree";
import axios from "axios";
import { io } from "socket.io-client"

const BASE_URL = "http://localhost:3000/";

const socket = io(BASE_URL);

let id;

socket.on("connect", () => {
  id = socket.id;
})

socket.on("fetch", newTodos => {
  todosStore?.setTodos(newTodos);
});

export const TodoModel = types.model("TodoModel", {
  id: types.identifier,
  title: "",
  description: "",
});

export const TodosStore = types
  .model("TodoStore", {
    todos: types.array(TodoModel),
    selectedTodo: types.safeReference(TodoModel),
    showSaveSpinner: false,
  })
  .actions((self) => ({
    setSelectedTodo(id) {
      self.selectedTodo = self.todos.find((todo) => todo.id === id);
    },
    setTodos(newTodos) {
      self.todos = newTodos;
    },
    addTodo(todo) {

      self.todos.push(todo);
    },
    insertTodo: flow(function* (todo, index) {
      self.showSaveSpinner = true;

      const response = yield axios.post(`${BASE_URL}todos/`, todo);

      if (response.status !== 201) {
        alert("add failed");
        return;
      }

      self.todos.splice(index, 0, todo);

      self.showSaveSpinner = false;
    }),
    update(updatedTodo) {

      socket.emit("update", updatedTodo);

      let todoIndex = self.todos.findIndex(
        (todo) => todo.id === updatedTodo.id
      );
      self.todos[todoIndex] = { ...updatedTodo };
    },
    fetchDelete(id) {
      const todo = self.todos.find((todo) => todo.id === id);

      socket.emit("delete", todo.id);

      if (todo) destroy(todo);
    },
  }));

let todosStore;
export const useTodosStore = () => {
  if (!todosStore)
    todosStore = TodosStore.create({
      todos: [],
      selectedTodo: undefined,
    });

  return todosStore;
};
