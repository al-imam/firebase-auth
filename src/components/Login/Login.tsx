import Input from "../Input/Input";
import classes from "./login.module.css";

const Login: React.FunctionComponent = () => {
  return (
    <form className={classes.form}>
      <Input type="text" placeholder="Enter email address" />
      <Input type="password" placeholder="Enter password" />
      <button className={classes.log} type="submit">
        Log in
      </button>
      <a href="#" className={classes.forget}>
        Forget password?
      </a>
      <hr className={classes.line} />
      <button className={classes.newAccount} type="button">
        Create New Account
      </button>
    </form>
  );
};

export default Login;
