import React from "react";
import classes from "./card.module.css";

interface CardProps {
  handleClose?: () => void;
  showCloseButton?: boolean;
  children: React.ReactNode;
  title: string;
}

const Card = ({ title, children, showCloseButton, handleClose }: CardProps) => {
  return (
    <div className={classes.root}>
      <h2>{title}</h2>
      {showCloseButton && <button onClick={handleClose} className={classes.closeIcon}>close</button>}
      {children}
    </div>
  );
};

export default Card;
