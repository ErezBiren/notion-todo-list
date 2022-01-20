import React, { useEffect, useRef } from "react";
import classes from "./TodoItem.module.css";
import tinykeys from "tinykeys";

interface TotoItemProps {
  todoItem: TodoItemModel;
  handleDeleteItem: () => void;
}

const TodoItem = ({ todoItem, handleDeleteItem }: TotoItemProps) => {
  const [isShow, setShow] = React.useState(true);

  const lblRef = useRef(null);

  useEffect(() => {
    console.log(lblRef.current);

    tinykeys(lblRef.current, {
      Backspace: () => {
        console.log(lblRef);
      },
    });
  }, []);

  const handleDoneCheckbox = () => {
    setShow(false);
  };

  return (
    <li className={!isShow && classes.hidden}>
      <div
        className={`${classes.listIem} ${!isShow && classes.listIemDeleted}`}
      >
        <input
          type="checkbox"
          onChange={handleDoneCheckbox}
          onTransitionEnd={handleDeleteItem}
        ></input>
        <label contentEditable ref={lblRef}>
          {todoItem.title}
        </label>
        {todoItem.description && <div className={classes.detailsIcon}></div>}
      </div>
    </li>
  );
};

export default TodoItem;
