import React, { useEffect, useRef } from "react";
import classes from "./TodoItem.module.css";
import tinykeys from "tinykeys";

const TodoItem = ({ todoItem, handleDeleteItem }) => {
  const [isShow, setShow] = React.useState(true);

  const lblRef = useRef(null);

  useEffect(() => {
    tinykeys(lblRef.current, {
      Backspace: () => {},
    });
  }, []);

  const handleDoneCheckbox = () => {
    setShow(false);
  };

  return (
    <li className={`${!isShow && classes.hidden}`}>
      <div
        className={`${classes.listIem} ${!isShow && classes.listIemDeleted}`}
      >
        <input
          type="checkbox"
          onChange={handleDoneCheckbox}
          
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
