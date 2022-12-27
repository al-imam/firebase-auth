import classes from "./alert.module.css";

const Alert: React.FunctionComponent<{ message: string }> = ({ message }) => {
  return <span className={classes.alert}>{message}</span>;
};

export default Alert;
