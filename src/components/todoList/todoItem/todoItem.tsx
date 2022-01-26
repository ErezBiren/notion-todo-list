import React, { useEffect, useRef } from "react";
import classes from "./TodoItem.module.css";
import tinykeys from "tinykeys";
import DetailsIcon from "../../../assets/details.svg?component";
import { useTodosStore } from "../../../models/todosStore";
import { observer } from "mobx-react";

const DELAY_BEFORE_DELETE = 1500;

interface TodoItemProps {
  todoItem: any;
  handleDelete?: (id: string, index: number) => void;
  handleSelected?: (id: string) => void;
  handleInsert?: (index: number) => void;
  listRef: React.ReactNode;
}

const TodoItem = ({
  todoItem,
  handleDelete,
  handleSelected,
  handleInsert,
  listRef,
}: TodoItemProps) => {
  const [isShow, setShow] = React.useState(true);
  const todoStore = useTodosStore();

  const currentItemRef = useRef();
  const lblRef = useRef(null);

  useEffect(() => {
    return tinykeys(lblRef.current, {
      Backspace: () => {
        if (lblRef.current.innerText === "") {
          const currentIndex = getCurrentIndex();
          handleDelete(todoItem.id, currentIndex - 1);
        }
      },
      Enter: (event) => {
        event.preventDefault();

        const currentIndex = getCurrentIndex();
        handleInsert(currentIndex + 1);
      },
    });
  }, []);

  const handleDoneCheckbox = () => {
    setShow(false);

    setTimeout(() => {
      const currentIndex = getCurrentIndex();
      handleDelete(todoItem.id, currentIndex - 1);
    }, DELAY_BEFORE_DELETE);
  };

  const getCurrentIndex = () => {
    const li = currentItemRef.current.closest("li");
    const childrenArray = [...listRef.current.children];
    const index = childrenArray.indexOf(li);
    return index;
  };

  const HandleClick = () => {
    handleSelected(todoItem.id);
  };

  const handleChange = (event) => {
    todoStore.update({ ...todoItem, title: event.currentTarget.textContent });
  };

  return (
    <div className={`${!isShow && classes.hidden}`} ref={currentItemRef}>
      <div
        onClick={HandleClick}
        className={`${classes.listIem} ${!isShow && classes.listIemDeleted}`}
      >
        <input type="checkbox" onChange={handleDoneCheckbox}></input>
        <label
          contentEditable
          suppressContentEditableWarning={true}
          ref={lblRef}
          onInput={handleChange}
        >
          {todoItem.title}
        </label>
        {todoItem.description != "" && <DetailsIcon />}
      </div>
    </div>
  );
};

export default observer(TodoItem);
