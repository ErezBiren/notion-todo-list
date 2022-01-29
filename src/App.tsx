import React, { useState, useEffect } from "react";
import classes from "./App.module.css";
import Card from "./components/card/card";
import SaveSpinner from "./components/saveSpinner/saveSpinner";
import TodoDetails from "./components/todoDetails/todoDetails";
import TodoList from "./components/todoList/todoList";
import { useTodosStore } from "./models/todosStore";
import { observer } from "mobx-react";

function App() {
  const [showDetails, setShowDetails] = useState(true);

  const todosStore = useTodosStore();

  useEffect(() => {
    todosStore.fetchTodos();
  }, [todosStore]);

  useEffect(() => {
    setShowDetails(true);
  }, [todosStore?.selectedTodo]);

  const handleClose = () => {
    setShowDetails(false);
  };

  return (
    <div className={classes.main}>
      <SaveSpinner></SaveSpinner>
      <div className={classes.todoContainer}>
        <div className={classes.master}>
          <Card title="My Todo List">
            <div>
              <TodoList />
            </div>
          </Card>
        </div>
        <div
          className={`${classes.splitter} ${!showDetails && classes.hidden}`}
        />
        <div className={`${classes.details} ${!showDetails && classes.hidden}`}>
          <TodoDetails handleClose={handleClose} />
        </div>
      </div>
    </div>
  );
}

export default observer(App);
