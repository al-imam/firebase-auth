import classes from "./form.module.css";

interface FormProps {
  children: React.ReactNode;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
}

const Form: React.FunctionComponent<FormProps> = ({ children, onSubmit }) => (
  <form className={classes.form} onSubmit={onSubmit}>
    {children}
  </form>
);

export default Form;
