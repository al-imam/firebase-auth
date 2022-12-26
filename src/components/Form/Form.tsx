import classes from "./form.module.css";

interface FormProps {
  children: React.ReactNode;
}

const Form: React.FunctionComponent<FormProps> = ({ children }) => (
  <form className={classes.form}>{children}</form>
);

export default Form;
