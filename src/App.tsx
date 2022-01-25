import React, { useState, useEffect } from "react";
import classes from "./App.module.css";
import Card from "./components/card/card";
import TodoDetails from "./components/todoDetails/todoDetails";
import TodoList from "./components/todoList/todoList";
import { useTodosStore } from "./models/todosStore";

function App() {
  const [showDetails, setShowDetails] = useState(true);

  const todosStore = useTodosStore();

  useEffect(() => {
    todosStore.fetchTodos();
  }, [todosStore]);

  const handleClose = () => {
    setShowDetails(false);
  };

  return (
    <div className={classes.main}>
      <div className={classes.master}>
        <Card title="My Todo List">
          <div>
            <TodoList />
          </div>
        </Card>
      </div>
      {showDetails && <div className={classes.splitter} />}
      {showDetails && <TodoDetails handleClose={handleClose} />}
    </div>
  );
}

export default App;

/*
{
  "todos": [
    { "id": "1", "title": "Feed dog"},
    { "id": "2", "title":"Go for walk"},
    { "id": "3", "title":"Write essay", "description": "-electric /n -water" },
    { "id": "4", "title":"Write essay" }
  ]
}
*/
