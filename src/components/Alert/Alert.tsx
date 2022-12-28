import classes from "./alert.module.css";

interface AlertProps {
  message: string;
  variant?: "success" | "danger";
}

const Alert: React.FunctionComponent<AlertProps> = ({
  message,
  variant = "danger",
}) => {
  return (
    <span className={`${classes.alert} ${classes[variant]}`}>{message}</span>
  );
};

export default Alert;
