import React, { useEffect, useRef } from "react";
import classes from "./TodoItem.module.css";
import tinykeys from "tinykeys";
import DetailsIcon from "../../../assets/details.svg?component";
import { useTodosStore } from "../../../models/todosStore";
import { observer } from "mobx-react";
import { v4 as uuidv4 } from "uuid";

const DELAY_BEFORE_DELETE = 1500;

interface TodoItemProps {
  todoItem: any;
  handleDelete?: (string) => void;
  handleSelected?: (string) => void;
}

const TodoItem = ({
  todoItem,
  handleDelete,
  handleSelected,
}: TodoItemProps) => {
  const [isShow, setShow] = React.useState(true);
  const todoStore = useTodosStore();

  const lblRef = useRef(null);

  useEffect(() => {
    return tinykeys(lblRef.current, {
      Backspace: () => {
        console.log(lblRef.current);
        if (lblRef.current.innerText === "") {
          handleDelete(todoItem.id);
        }
      },
      Enter: (event) => {
        event.preventDefault();

        const newTodo = { id: uuidv4(), title: "" };
        todoStore.addTodo(newTodo);
      },
    });
  }, []);

  const handleDoneCheckbox = () => {
    setShow(false);

    setTimeout(() => {
      handleDelete(todoItem.id);
    }, DELAY_BEFORE_DELETE);
  };

  const HandleClick = () => {
    handleSelected(todoItem.id);
  };

  const handleChange = (event) => {
    todoStore.update({ ...todoItem, title: event.currentTarget.textContent });
  };

  return (
    <div className={`${!isShow && classes.hidden}`}>
      <div
        onClick={HandleClick}
        className={`${classes.listIem} ${!isShow && classes.listIemDeleted}`}
      >
        <input type="checkbox" onChange={handleDoneCheckbox}></input>
        <label contentEditable ref={lblRef} onInput={handleChange}>
          {todoItem.title}
        </label>
        {todoItem.description != "" && <DetailsIcon />}
      </div>
    </div>
  );
};

export default observer(TodoItem);
