import { io } from "socket.io-client"

const BASE_URL = "http://localhost:3000/";

const socket = io(BASE_URL);

let id;

socket.on("connect", () => {
  id = socket.id;
})

socket.on("fetch", newTodos => {
  //todosStore?.setTodos(newTodos);
});