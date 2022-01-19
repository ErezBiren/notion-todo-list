import React from "react";
import classes from "./todoList.module.css";

interface TotoItem {
  title: string;
  id: string;
}

const todos: TotoItem[] = [
  { id: "1", title: "Feed dog" },
  { id: "2", title: "Go for walk" },
];

const TodoList = () => {
  return (
    <div>
      <ul>
        {todos.map((todoItem) => (
          <li className={classes.list} key={todoItem.id}>
            <input type="checkbox"></input>
            <label for={todoItem.title} contentEditable>
              {todoItem.title}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
