import Button from "../Button/Button";
import Input from "../Input/Input";
import classes from "./login.module.css";

const Login: React.FunctionComponent = () => {
  return (
    <form className={classes.form}>
      <Input type="text" placeholder="Enter email address" />
      <Input type="password" placeholder="Enter password" />
      <Button text="Log in" />
      <a href="#" className={classes.forget}>
        Forget password?
      </a>
      <hr className={classes.line} />
      <a href="#" className={classes.newAccount}>
        Create New Account
      </a>
    </form>
  );
};

export default Login;
