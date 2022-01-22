import React, { useState, useEffect } from "react";
import classes from "./App.module.css";
import Card from "./components/card/card";
import TodoDetails from "./components/todoDetails/todoDetails";
import TodoList from "./components/todoList/todoList";
import { onSnapshot } from "mobx-state-tree";
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

  onSnapshot(todosStore, (snapshot) => {
    //console.dir(snapshot);
  });

  return (
    <div className={classes.main}>
      <div className={classes.master}>
        <Card title="My Todo List">
          <div>
            <TodoList></TodoList>
          </div>
        </Card>
      </div>
      {showDetails && <div className={classes.splitter}></div>}
      {showDetails && <TodoDetails handleClose={handleClose}></TodoDetails>}
    </div>
  );
}

export default App;
