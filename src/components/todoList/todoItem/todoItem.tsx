import React, { useEffect, useRef } from "react";
import classes from "./TodoItem.module.css";
import tinykeys from "tinykeys";
import DetailsIcon from "../../../assets/details.svg?component";
import { useTodosStore } from "../../../models/todosStore";

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
    tinykeys(lblRef.current, {
      Backspace: () => {},
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
    <li className={`${!isShow && classes.hidden}`}>
      <div
        onClick={HandleClick}
        className={`${classes.listIem} ${!isShow && classes.listIemDeleted}`}
      >
        <input type="checkbox" onChange={handleDoneCheckbox}></input>
        <label contentEditable ref={lblRef} onInput={handleChange}>
          {todoItem.title}
        </label>
        {todoItem.description && <DetailsIcon></DetailsIcon>}
      </div>
    </li>
  );
};

export default TodoItem;
