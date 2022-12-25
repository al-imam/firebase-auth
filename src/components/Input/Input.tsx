import classes from "./input.module.css";

interface InputProps {
  type: string;
  placeholder: string;
}

const Input: React.FunctionComponent<InputProps> = ({ type, placeholder }) => (
  <input
    className={classes.inputs}
    type={type}
    placeholder={placeholder}
    required
  />
);

export default Input;
