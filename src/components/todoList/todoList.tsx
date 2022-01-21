import React from "react";
import classes from "./todoList.module.css";
import TodoItem from "./todoItem/todoItem";
import AddTaskButton from "./addTaskButton/addTaskButton";
import { observer } from "mobx-react";
import { useTodosStore } from "../../models/todosStore";

// const todos: TodoItemModel[] = [
//   { id: "1", title: "Feed dog" },
//   { id: "2", title: "Go for walk" },
//   { id: "3", title: "Write essay", description: "- electric -water" },
// ];

const TodoList = () => {
  const todoStore = useTodosStore();

  const handleDeleteItem = (todoID) => {
    todoStore.deleteTodo(todoID);
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
              handleDeleteItem={handleDeleteItem}
            ></TodoItem>
          </div>
        ))}
      </ul>
      <AddTaskButton handleAddTask={handleAddTask}></AddTaskButton>
    </div>
  );
};

export default observer(TodoList);
