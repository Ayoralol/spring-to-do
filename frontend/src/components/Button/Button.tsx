import {MouseEvent} from "react";
import styles from "./Button.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

interface ButtonProps {
  handleClick: (event: MouseEvent<HTMLButtonElement>) => unknown;
  icon: IconProp;
  border: string;
}
const Button: React.FC<ButtonProps> = ({handleClick, icon, border}) => {
  return (
    <button onClick={handleClick} className={`${styles.btn} ${styles[border]}`}>
      <FontAwesomeIcon icon={icon} size={"lg"} />
    </button>
  );
};

export default Button;
