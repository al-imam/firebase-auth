import classes from "./button.module.css";

interface ButtonProps {
  text: string;
}

const Button: React.FunctionComponent<ButtonProps> = ({ text }) => (
  <button className={classes.Button} type="submit">
    {text}
  </button>
);

export default Button;
