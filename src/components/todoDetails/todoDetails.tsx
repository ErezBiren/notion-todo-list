import { autorun } from "mobx";
import { observer } from "mobx-react";

import React, { useState, useEffect } from "react";
import { useTodosStore } from "../../models/todosStore";
import Card from "../card/card";
import classes from "./todoDetails.module.css";

const TodoDetails = ({ handleClose }) => {
  const todoStore = useTodosStore();

  autorun(() => {
    console.log(888);
    console.log(todoStore.selectedTodo);
  });

  const handleChange = (event) => {
    let todo = todoStore.selectedTodo;

    todoStore.update({
      ...todo,
      description: event.currentTarget.textContent,
    });
  };

  return (
    <div className={classes.detail}>
      <Card
        showCloseButton
        handleClose={handleClose}
        title={todoStore.selectedTodo?.title}
      >
        <div
          contentEditable
          onInput={handleChange}
          className={classes.detailsEditor}
        >
          {todoStore.selectedTodo?.description}
        </div>
      </Card>
    </div>
  );
};

export default observer(TodoDetails);
