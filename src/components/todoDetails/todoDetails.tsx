import { observer } from "mobx-react";
import React from "react";
import { useTodosStore } from "../../models/todosStore";
import Card from "../card/card";
import classes from "./todoDetails.module.css";

const TodoDetails = ({ handleClose }) => {
  
  const todoStore = useTodosStore();
  return (
    <div className={classes.detail}>
      <Card showCloseButton handleClose={handleClose}>
        {todoStore.selectedTodo}
      </Card>
    </div>
  );
};

export default observer(TodoDetails);
