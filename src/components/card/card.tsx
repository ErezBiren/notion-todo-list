import React from "react";
import classes from "./card.module.css";
import { ReactComponent as CloseIcon } from "../../assets/close.svg";

interface CardProps {
  handleClose?: () => void;
  showCloseButton?: boolean;
  children: React.ReactNode;
}

const Card = ({ children, showCloseButton, handleClose }: CardProps) => {
  return (
    <div className={classes.root}>
      {showCloseButton && (
        <button onClick={handleClose}>
          {/* <CloseIcon width="125" height="125" /> */}
          close
        </button>
      )}
      {children}
    </div>
  );
};

export default Card;
