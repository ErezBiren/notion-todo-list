import { observer } from "mobx-react";
import React, { useState, useEffect } from "react";
import { useTodosStore } from "../../models/todosStore";
import Card from "../card/card";
import classes from "./todoDetails.module.css";

const TodoDetails = ({ handleClose }) => {
  const todoStore = useTodosStore();

  const [todo, setTodo] = useState();

  useEffect(() => {
    setTodo(todoStore.selectedTodo());
  }, [todoStore.selectedTodo()]);

  const handleChange = (event) => {
    todoStore.updateDescription(
      todo.id,
      event.currentTarget.textContent
    );
  };

  return (
    <div className={classes.detail}>
      <Card
        showCloseButton
        handleClose={handleClose}
        title={todo?.title}
      >
        <div
          contentEditable
          onInput={handleChange}
          className={classes.detailsEditor}
        >
          {todo?.description}
        </div>
      </Card>
    </div>
  );
};

export default observer(TodoDetails);
