import Anchor from "../Anchor/Anchor";
import Button from "../Button/Button";
import Hr from "../Hr/Hr";
import Input from "../Input/Input";
import classes from "./login.module.css";

const Login: React.FunctionComponent = () => {
  return (
    <form className={classes.form}>
      <Input type="text" placeholder="Enter email address" />
      <Input type="password" placeholder="Enter password" />
      <Button text="Log in" />
      <Anchor text="Forget password" />
      <Hr />
      <Anchor text="Create new account" variant="button" />
    </form>
  );
};

export default Login;
