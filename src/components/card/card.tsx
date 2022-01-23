import React from "react";
import classes from "./card.module.css";
import CloseIcon from "../../assets/close.svg?component";

interface CardProps {
  handleClose?: () => void;
  showCloseButton?: boolean;
  children: React.ReactNode;
  title: string;
  titleContent?: React.ReactNode;
}

const Card = ({
  title,
  titleContent,
  children,
  showCloseButton,
  handleClose,
}: CardProps) => {
  return (
    <div className={classes.root}>
      {titleContent}
      {title && <h2>{title}</h2>}

      {showCloseButton && (
        <CloseIcon onClick={handleClose} className={classes.closeIcon} />
      )}

      {children}
    </div>
  );
};

export default Card;
