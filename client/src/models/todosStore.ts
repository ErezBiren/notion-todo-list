import { types, destroy, flow } from "mobx-state-tree";
import axios from "axios";
import { io } from "socket.io-client"

const BASE_URL = "http://localhost:3000/";

const socket = io(BASE_URL);


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
    fetchTodos: flow(function* () {
      self.showSaveSpinner = true;

      const response = yield axios.get(`${BASE_URL}todos`);
      const data = response.data;

      const newTodos = data.map((todo) => ({
        id: todo.id,
        title: todo.title,
        description: todo.description ? todo.description : "",
      }));

      self.todos = newTodos;

      self.showSaveSpinner = false;
    }),
    addTodo: flow(function* (todo) {
      self.showSaveSpinner = true;

      //simulate delay
      //yield new Promise((resolve) => setTimeout(resolve, 1000));

      const response = yield axios.post(`${BASE_URL}todos/`, todo);

      if (response.status !== 201) {
        alert("add failed");
        return;
      }

      self.todos.push(todo);

      self.showSaveSpinner = false;
    }),
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
    update: flow(function* (updatedTodo) {
      self.showSaveSpinner = true;

      const response = yield axios.put(
        `${BASE_URL}todos\\${updatedTodo.id}`,
        updatedTodo
      );

      if (response.status != 200) {
        alert("update failed");
        return;
      }

      let todoIndex = self.todos.findIndex(
        (todo) => todo.id === updatedTodo.id
      );

      self.todos[todoIndex] = { ...updatedTodo };

      self.showSaveSpinner = false;
    }),
    fetchDelete: flow(function* (id) {
      self.showSaveSpinner = true;

      const response = yield axios.delete(`${BASE_URL}todos\\${id}`);

      if (response.status !== 200) {
        alert("delete failed");
        return;
      }

      const todo = self.todos.find((todo) => todo.id === id);
      if (todo) destroy(todo);

      self.showSaveSpinner = false;
    }),
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