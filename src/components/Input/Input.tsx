import classes from "./input.module.css";

interface InputProps {
  type: string;
  placeholder: string;
  name?: string;
}

const Input: React.FunctionComponent<InputProps> = ({
  type,
  placeholder,
  name,
}) => (
  <input
    className={classes.inputs}
    type={type}
    placeholder={placeholder}
    name={name}
    required
  />
);

export default Input;
