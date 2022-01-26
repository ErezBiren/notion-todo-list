import React, { useEffect, useRef } from "react";
import classes from "./todoList.module.css";
import TodoItem from "./todoItem/todoItem";
import AddTaskButton from "./addTaskButton/addTaskButton";
import { useTodosStore } from "../../models/todosStore";
import { observer } from "mobx-react";
import { v4 as uuidv4 } from "uuid";

const TodoList = () => {
  const listRef = useRef();

  const todoStore = useTodosStore();

  const handleDeleteItem = (todoID: string) => {
    todoStore.fetchDelete(todoID);
  };

  const handleSelected = (todoID: string) => {
    todoStore.setSelectedTodo(todoID);
  };

  const handleInsert = async (index: number) => {
    const newTodo = { id: uuidv4(), title: "" };
    await todoStore.insertTodo(newTodo, index);
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
      <AddTaskButton />
    </div>
  );
};

export default observer(TodoList);
