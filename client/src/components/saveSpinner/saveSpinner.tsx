import { observer } from "mobx-react";
import React from "react";
import classes from "./saveSpinner.module.css";
import { useTodosStore } from "../../models/todosStore";

const SaveSpinner = () => {
  const todoStore = useTodosStore();

  return (
    <>
      {
        <div
          className={`${classes.root} ${
            todoStore.showSaveSpinner ? "" : classes.hidden
          }`}
        >
          <div className={classes.saveAnimation} />
          <label className={classes.text}>Getting Data ...</label>
        </div>
      }
    </>
  );
};

export default observer(SaveSpinner);
