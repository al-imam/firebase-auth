import classes from "./input.module.css";

interface InputProps {
  type: string;
  placeholder: string;
  dispatch: (value: string) => void;
  value: string;
}

const Input: React.FunctionComponent<InputProps> = ({
  type = "text",
  placeholder,
  dispatch,
  value,
}) => (
  <input
    value={value}
    onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
      dispatch(evt.currentTarget.value)
    }
    className={classes.inputs}
    type={type}
    placeholder={placeholder}
    required
  />
);

export default Input;
