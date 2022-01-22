import React, { useEffect } from "react";
import classes from "./todoList.module.css";
import TodoItem from "./todoItem/todoItem";
import AddTaskButton from "./addTaskButton/addTaskButton";
import { useTodosStore } from "../../models/todosStore";
import { observer } from "mobx-react-lite";

const TodoList = () => {
  const todoStore = useTodosStore();

  const handleDeleteItem = (todoID: string) => {
    todoStore.fetchDelete(todoID);
  };

  const handleSelected = (todoID: string) => {
    todoStore.setSelectedTodo(todoID);
  };

  const handleAddTask = () => {
    // add task to mobx
  };

  return (
    <div>
      <ul className={classes.ul}>
        {todoStore.todos.map((todoItem) => (
          <div key={todoItem.id}>
            <TodoItem
              todoItem={todoItem}
              handleSelected={handleSelected}
              handleDelete={handleDeleteItem}
            ></TodoItem>
          </div>
        ))}
      </ul>
      <AddTaskButton handleAddTask={handleAddTask}></AddTaskButton>
    </div>
  );
};

export default observer(TodoList);
