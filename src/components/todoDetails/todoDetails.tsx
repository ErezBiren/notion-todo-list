import { observer } from "mobx-react";
import { debounce } from "lodash";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useTodosStore } from "../../models/todosStore";
import Card from "../card/card";
import classes from "./todoDetails.module.css";
import { useEditable } from "use-editable";

const TodoDetails = ({ handleClose }) => {
  const todoStore = useTodosStore();

  const [title, setTitle] = useState();
  const titleRef = useRef(null);

  const debouncedUpdateTitle = useRef(
    debounce((text: string) => {
      update("title", text);
    }, 500)
  );

  const onTitleChange = (text: string) => {
    setTitle(text.slice(0, -1));
    debouncedUpdateTitle.current(text);
  };

  useEditable(titleRef, onTitleChange);

  useEffect(() => {
    setTitle(todoStore?.selectedTodo?.title);
  }, [todoStore?.selectedTodo, todoStore?.selectedTodo?.title]);

  // description
  const [description, setDescription] = useState();
  const descriptionRef = useRef(null);

  const debouncedUpdateDescription = useRef(
    debounce((text: string) => {
      update("description", text);
    }, 500)
  );

  const onDescriptionChange = (text: string) => {
    setDescription(text.slice(0, -1));
    debouncedUpdateDescription.current(text);
  };

  useEditable(descriptionRef, onDescriptionChange);

  useEffect(() => {
    setDescription(todoStore?.selectedTodo?.description);
  }, [todoStore?.selectedTodo, todoStore?.selectedTodo?.description]);

  const update = (propertyName: string, newValue: string) => {
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
