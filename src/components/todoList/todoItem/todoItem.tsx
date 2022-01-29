import React, { useEffect, useRef, useState, useCallback } from "react";
import classes from "./TodoItem.module.css";
import tinykeys from "tinykeys";
import DetailsIcon from "../../../assets/details.svg?component";
import { useTodosStore } from "../../../models/todosStore";
import { observer } from "mobx-react";
import { useEditable } from "use-editable";
import { debounce } from "lodash";

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

  const currentItemRef = useRef(null);

  useEffect(() => {
    return tinykeys(titleRef.current, {
      Backspace: () => {
        if (titleRef.current.innerText === "") {
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

  // title
  const [title, setTitle] = useState();
  const titleRef = useRef(null);

  const debouncedUpdateTitle = useRef(
    debounce((text: string) => {
      todoStore.update({ ...todoItem, title: text });
    }, 500)
  );

  const onTitleChange = (text: string) => {
    setTitle(text.slice(0, -1));
    debouncedUpdateTitle.current(text);
  };

  useEditable(titleRef, onTitleChange);

  useEffect(() => {
    setTitle(todoItem.title);
  }, [todoItem, todoItem.title]);

  return (
    <div className={`${!isShow && classes.hidden}`} ref={currentItemRef}>
      <div
        onClick={HandleClick}
        className={`${classes.listIem} ${!isShow && classes.listIemDeleted}`}
      >
        <input type="checkbox" onChange={handleDoneCheckbox}></input>
        <div ref={titleRef}>{title}</div>
        {todoItem.description != "" && <DetailsIcon />}
      </div>
    </div>
  );
};

export default observer(TodoItem);
