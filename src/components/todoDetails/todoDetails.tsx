import { observer } from "mobx-react";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useTodosStore } from "../../models/todosStore";
import Card from "../card/card";
import classes from "./todoDetails.module.css";
import { useEditable } from "use-editable";

const TodoDetails = ({ handleClose }) => {
  const todoStore = useTodosStore();

  // title
  const [title, setTitle] = useState();
  const titleRef = useRef(null);

  const onTitleChange = useCallback((title) => {
    update("title", title);
    setTitle(title.slice(0, -1));
  }, []);

  useEditable(titleRef, onTitleChange, { indentation: 2 });

  useEffect(() => {
    setTitle(todoStore?.selectedTodo?.title);
  }, [todoStore?.selectedTodo, todoStore?.selectedTodo?.title]);

  // description
  const [description, setDescription] = useState();
  const descriptionRef = useRef(null);

  const onDescriptionChange = useCallback((description) => {
    setDescription(description.slice(0, -1));
    update("description", description);
  }, []);

  useEditable(descriptionRef, onDescriptionChange, { indentation: 2 });

  useEffect(() => {
    setDescription(todoStore?.selectedTodo?.description);
  }, [todoStore?.selectedTodo, todoStore?.selectedTodo?.description]);

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
        titleContent={<h2 ref={titleRef}>{title}</h2>}
      >
        <div ref={descriptionRef} className={classes.detailsEditor}>
          {description}
        </div>
      </Card>
    </div>
  );
};

export default observer(TodoDetails);
