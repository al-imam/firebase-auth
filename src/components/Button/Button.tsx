import classes from "./button.module.css";

interface ButtonProps {
  text: string;
  disable?: boolean;
}

const Button: React.FunctionComponent<ButtonProps> = ({
  text,
  disable = false,
}) => (
  <button className={classes.Button} disabled={disable} type="submit">
    {text}
  </button>
);

export default Button;
