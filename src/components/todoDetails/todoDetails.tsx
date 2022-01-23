import { observer } from "mobx-react";

import React, { useState, useEffect } from "react";
import { useTodosStore } from "../../models/todosStore";
import Card from "../card/card";
import classes from "./todoDetails.module.css";

const TodoDetails = ({ handleClose }) => {
  const todoStore = useTodosStore();

  const descriptionChanged = (event) => {
    update("description", event.currentTarget.textContent);
  };

  const titleChanged = (event) => {
    update("title", event.currentTarget.textContent);
  };

  const update = (propertyName, newValue) => {
    let todo = todoStore.selectedTodo;

    todoStore.update({
      ...todo,
      [propertyName]: newValue,
    });
  };

  return (
    <div className={classes.detail}>
      <Card
        showCloseButton
        handleClose={handleClose}
        titleContent={
          <h2 contentEditable onInput={titleChanged}>
            {todoStore.selectedTodo?.title}
          </h2>
        }
      >
        <div
          contentEditable
          onInput={descriptionChanged}
          className={classes.detailsEditor}
        >
          {todoStore.selectedTodo?.description}
        </div>
      </Card>
    </div>
  );
};

export default observer(TodoDetails);
