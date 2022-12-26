import Anchor from "../Anchor/Anchor";
import Button from "../Button/Button";
import Form from "../Form/Form";
import Input from "../Input/Input";
import classes from "./singUp.module.css";

const SingUp: React.FunctionComponent = () => {
  return (
    <Form>
      <h1 className={classes.h1}>SingUp Form</h1>
      <Input type="text" placeholder="Email" />
      <Input type="password" placeholder="Password" />
      <Input type="password" placeholder="Confirm password" />
      <Button text="Sing Up" />
      <p className={classes.p}>
        Already have account?
        <Anchor to="/login" text="Login" />
      </p>
    </Form>
  );
};

export default SingUp;
