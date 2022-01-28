import { observer } from "mobx-react";
import React from "react";
import classes from "./saveSpinner.module.css";
import { useTodosStore } from "../../models/todosStore";

const SaveSpinner = () => {
  const todoStore = useTodosStore();

  return (
    <>
      {todoStore.showSaveSpinner && (
        <div className={classes.root}>
          <div className={classes.saveAnimation} />
          <label className={classes.text}>Saving ...</label>
        </div>
      )}
    </>
  );
};

export default observer(SaveSpinner);
