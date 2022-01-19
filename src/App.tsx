import React, { useState } from "react";
import classes from "./App.module.css";
import Card from "./components/card/card";
import TodoList from "./components/todoList/todoList";

function App() {
  const [showDetails, setShowDetails] = useState(true);

  const handleClose = () => {
    setShowDetails(false);
  };

  return (
    <div className={classes.main}>
      <div className={classes.master}>
        <Card>
          <div>
            <div>My Todo List</div>
            <TodoList />
          </div>
        </Card>
      </div>
      {showDetails && <div className={classes.splitter}></div>}
      {showDetails && (
        <div className={classes.detail}>
          <Card showCloseButton handleClose={handleClose}>
            Pay Bills
          </Card>
        </div>
      )}
    </div>
  );
}

export default App;
