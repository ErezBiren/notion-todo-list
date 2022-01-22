import React from "react";
import classes from "./card.module.css";

interface CardProps {
  handleClose?: () => void;
  showCloseButton?: boolean;
  children: React.ReactNode;
}

const Card = ({ children, showCloseButton, handleClose }: CardProps) => {
  return (
    <div className={classes.root}>
      {showCloseButton && <button onClick={handleClose}>close</button>}
      {children}
    </div>
  );
};

export default Card;
