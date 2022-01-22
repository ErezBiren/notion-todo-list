import React from "react";
import { useTodosStore } from "../../../models/todosStore";
import classes from "./addTaskButton.module.css";
import { v4 as uuidv4 } from "uuid";

const AddTaskButton = () => {
  const todosStore = useTodosStore();

  const handleAddTask = () => {
    const newTodo = { id: uuidv4(), title: "" };
    todosStore.addTodo(newTodo);
  };

  return (
    <div className={classes.addTask} onClick={handleAddTask}>
      + Add Task
    </div>
  );
};

export default AddTaskButton;
