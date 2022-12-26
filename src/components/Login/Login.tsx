import Anchor from "../Anchor/Anchor";
import Button from "../Button/Button";
import Form from "../Form/Form";
import Hr from "../Hr/Hr";
import Input from "../Input/Input";
import classes from "./login.module.css";

const Login: React.FunctionComponent = () => {
  return (
    <Form>
      <h1 className={classes.h1}>Login Form</h1>
      <Input type="text" placeholder="Enter email address" name="email" />
      <Input type="password" placeholder="Enter password" name="password" />
      <Button text="Log in" />
      <Anchor to="/forget-password" text="Forget password" />
      <Hr />
      <Anchor to="/singup" text="Create new account" variant="button" />
    </Form>
  );
};

export default Login;
