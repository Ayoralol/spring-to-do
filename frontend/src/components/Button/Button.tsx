import {MouseEvent, ReactNode} from "react";
import styles from "./Button.module.scss";

interface ButtonProps {
  handleClick: (event: MouseEvent<HTMLButtonElement>) => unknown;
  children: ReactNode;
}
const Button: React.FC<ButtonProps> = ({handleClick, children}) => {
  return (
    <button onClick={handleClick} className={styles.btn}>
      {children}
    </button>
  );
};

export default Button;
