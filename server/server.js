"use strict";

const fs = require("fs");

let dbData = fs.readFileSync("db.json");
let todos = JSON.parse(dbData);

const io = require("socket.io")(3000, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);

  io.to(socket.id).emit("fetch", todos);

  socket.on("add", (todo) => {
    todos.push(todo);
    saveToDB();
  });

  socket.on("insert", (todo, index) => {
    todos.splice(index, 0, todo);
    saveToDB();
  });

  socket.on("update", (updatedTodo) => {
    let todoIndex = todos.findIndex((todo) => todo.id === updatedTodo.id);

    todos[todoIndex] = { ...updatedTodo };

    saveToDB();
  });

  socket.on("delete", (id) => {
    console.log("delete");
    console.log(id);

    todos = todos.filter((todo) => todo.id !== id);

    saveToDB();
  });
});

const saveToDB = () => {
  fs.writeFile(
    "db.json",
    JSON.stringify(todos, null, "\t"),
    "utf8",
    function (err) {
      if (err) {
        return console.log(err);
      }
    }
  );
};
