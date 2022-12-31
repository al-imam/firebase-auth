import classes from "./checkBox.module.css";

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
  return (
    <div className={classes.checkGroup}>
      <input
        type="checkbox"
        id="show-email"
        checked={value}
        onChange={setValue}
      />
      <label htmlFor="show-email">{text}</label>
    </div>
  );
};

export default CheckBox;
