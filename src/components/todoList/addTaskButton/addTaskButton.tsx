import React from "react";
import classes from "./addTaskButton.module.css";

interface AddTaskButtonProps {
  handleAddTodo: () => void;
}

const AddTaskButton = ({ handleAddTodo }: AddTaskButtonProps) => {
  return (
    <div className={classes.addTask} onClick={handleAddTodo}>
      + Add Task
    </div>
  );
};

export default AddTaskButton;
