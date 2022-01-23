import React, { useEffect } from "react";
import classes from "./todoList.module.css";
import TodoItem from "./todoItem/todoItem";
import AddTaskButton from "./addTaskButton/addTaskButton";
import { useTodosStore } from "../../models/todosStore";
import { observer } from "mobx-react";

const TodoList = () => {
  const todoStore = useTodosStore();

  const handleDeleteItem = (todoID: string) => {
    todoStore.fetchDelete(todoID);
  };

  const handleSelected = (todoID: string) => {
    todoStore.setSelectedTodo(todoID);
  };

  return (
    <div>
      <ul className={classes.ul}>
        {todoStore.todos.map((todoItem) => (
          <li key={todoItem.id}>
            <TodoItem
              todoItem={todoItem}
              handleSelected={handleSelected}
              handleDelete={handleDeleteItem}
            ></TodoItem>
          </li>
        ))}
      </ul>
      <AddTaskButton />
    </div>
  );
};

export default observer(TodoList);
