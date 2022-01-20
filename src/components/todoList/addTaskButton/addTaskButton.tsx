import React from "react";
import classes from "./addTaskButton.module.css";

interface AddTaskButtonProps {
  handleAddTask: () => void;
}

const AddTaskButton = ({ handleAddTask }: AddTaskButtonProps) => {
  return (
    <div className={classes.addTask} onClick={handleAddTask}>
      + Add Task
    </div>
  );
};

export default AddTaskButton;
