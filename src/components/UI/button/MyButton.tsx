import React from 'react';
import classes from "./MyButton.module.css";

interface MyButtonProps {
  children: React.ReactNode
}

const MyButton = ({children, ...props}: MyButtonProps | any) => {
  return (
    <button {...props} className={classes.myBtn}>
      { children }
    </button>
  );
};

export default MyButton;
