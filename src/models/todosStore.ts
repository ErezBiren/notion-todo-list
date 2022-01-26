import { types, destroy, flow } from "mobx-state-tree";
import axios from "axios";

const BASE_URL = "http://localhost:3000/";

export const TodoModel = types.model("TodoModel", {
  id: types.identifier,
  title: "",
  description: "",
});

export const TodosStore = types
  .model("TodoStore", {
    todos: types.array(TodoModel),
    selectedTodo: types.safeReference(TodoModel),
  })
  .actions((self) => ({
    setSelectedTodo(id) {
      self.selectedTodo = self.todos.find((todo) => todo.id === id);
    },
    fetchTodos: flow(function* () {
      const response = yield axios.get(`${BASE_URL}todos`);
      const data = response.data;

      const newTodos = data.map((todo) => ({
        id: todo.id,
        title: todo.title,
        description: todo.description ? todo.description : "",
      }));

      self.todos = newTodos;
    }),
    addTodo: flow(function* (todo) {
      const response = yield axios.post(`${BASE_URL}todos/`, todo);

      if (response.status !== 201) {
        alert("add failed");
        return;
      }

      self.todos.push(todo);
    }),
    insertTodo: flow(function* (todo, index) {
      const response = yield axios.post(`${BASE_URL}todos/`, todo);

      if (response.status !== 201) {
        alert("add failed");
        return;
      }

      self.todos.splice(index, 0, todo);
    }),
    update: flow(function* (updatedTodo) {
      const response = yield axios.put(
        `${BASE_URL}todos\\${updatedTodo.id}`,
        updatedTodo
      );

      if (response.status != 200) {
        alert("update failed");
        return;
      }

      console.log(updatedTodo);

      let todoIndex = self.todos.findIndex(
        (todo) => todo.id === updatedTodo.id
      );

      self.todos[todoIndex] = { ...updatedTodo };
    }),
    fetchDelete: flow(function* (id) {
      const response = yield axios.delete(`${BASE_URL}todos\\${id}`);

      console.log(response.status);

      if (response.status !== 200) {
        alert("delete failed");
        return;
      }

      const todo = self.todos.find((todo) => todo.id === id);
      if (todo) destroy(todo);
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
