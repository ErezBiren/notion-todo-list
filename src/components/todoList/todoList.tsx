import React, { useEffect, useRef, useState } from "react";
import classes from "./todoList.module.css";
import TodoItem from "./todoItem/todoItem";
import AddTaskButton from "./addTaskButton/addTaskButton";
import { useTodosStore } from "../../models/todosStore";
import { observer } from "mobx-react";
import { v4 as uuidv4 } from "uuid";

const TodoList = () => {
  const [focusIndex, setFocusIndex] = useState(0);

  const listRef = useRef();

  useEffect(() => {
    focusElement(focusIndex);
  }, [focusIndex, listRef.current]);

  const todoStore = useTodosStore();

  const focusElement = (focusIndex: number) => {
    const childrenArray = [...listRef.current.children];
    if (!childrenArray) return;

    const focusedElement = childrenArray[focusIndex];
    if (!focusedElement) return;

    const inputLabel = focusedElement.getElementsByTagName("label")[0];
    if (!inputLabel) return;
    inputLabel.focus();
  };

  const handleDeleteItem = (todoID: string, index: number) => {
    todoStore.fetchDelete(todoID);
    setFocusIndex(index);
  };

  const handleSelected = (todoID: string) => {
    todoStore.setSelectedTodo(todoID);
  };

  const handleInsert = async (index: number) => {
    const newTodo = { id: uuidv4(), title: "" };
    await todoStore.insertTodo(newTodo, index);
    setFocusIndex(index);
  };

  const handleAddTodo = async () => {
    const newTodo = { id: uuidv4(), title: "" };
    await todoStore.addTodo(newTodo);
    setFocusIndex(todoStore.todos.length - 1);
  };

  return (
    <div>
      <ul className={classes.ul} ref={listRef}>
        {todoStore.todos.map((todoItem) => (
          <li key={todoItem.id}>
            <TodoItem
              listRef={listRef}
              todoItem={todoItem}
              handleSelected={handleSelected}
              handleDelete={handleDeleteItem}
              handleInsert={handleInsert}
            ></TodoItem>
          </li>
        ))}
      </ul>
      <AddTaskButton handleAddTodo={handleAddTodo} />
    </div>
  );
};

export default observer(TodoList);
