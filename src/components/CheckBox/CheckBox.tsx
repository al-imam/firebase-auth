import classes from "./checkBox.module.css";
import { useId } from "react";

interface CheckBoxProps {
  text: string;
  value: boolean;
  setValue: () => void;
}

const CheckBox: React.FunctionComponent<CheckBoxProps> = ({
  value,
  setValue,
  text,
}) => {
  const id = useId();

  return (
    <div className={classes.checkGroup}>
      <input type="checkbox" id={id} checked={value} onChange={setValue} />
      <label htmlFor={id}>{text}</label>
    </div>
  );
};

export default CheckBox;
