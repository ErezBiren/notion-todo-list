import React from "react";

interface TotoItem {
  title: string;
  id: string;
}

const todos: TotoItem[] = [
  { id: "1", title: "Deed dog" },
  { id: "2", title: "Go for walk" },
];

const TodoList = () => {
  return (
    <div>
      <ul>
        {todos.map((todoItem) => (
          <li key={todoItem.id}>{todoItem.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
