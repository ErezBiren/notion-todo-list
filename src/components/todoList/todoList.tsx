import React from "react";
import classes from "./todoList.module.css";
import { TodoItemModel } from "../../models";
import TodoItem from "./todoItem/todoItem";

const todos: TodoItemModel[] = [
  { id: "1", title: "Feed dog" },
  { id: "2", title: "Go for walk" },
  { id: "3", title: "Write essay", description: "- electric -water" },
];

const handleDeleteItem = () => {
  console.log("deleted");
};

const TodoList = () => {
  return (
    <div>
      <ul className={classes.ul}>
        {todos.map((todoItem) => (
          <TodoItem
            key={todoItem.id}
            todoItem={todoItem}
            handleDeleteItem={handleDeleteItem}
          ></TodoItem>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
