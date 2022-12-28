import { useState } from "react";
import Alert from "../Alert/Alert";
import Anchor from "../Anchor/Anchor";
import Button from "../Button/Button";
import Form from "../Form/Form";
import Hr from "../Hr/Hr";
import Input from "../Input/Input";
import classes from "./forget.module.css";

interface InitializerArg {
  loading: boolean;
  error: null | string;
}

const initializerArg: InitializerArg = {
  loading: false,
  error: null,
};

const Forget: React.FunctionComponent = () => {
  const [email, setEmail] = useState("");
  const [{ loading, error }, setLE] = useState<InitializerArg>(initializerArg);

  async function onSubmit(evt: React.FormEvent) {
    evt.preventDefault();
  }

  return (
    <Form onSubmit={onSubmit}>
      <h1 className={classes.h1}>Password reset</h1>
      {error && <Alert message={error} />}
      <Input
        type="text"
        placeholder="Email address"
        value={email}
        dispatch={(value: string) => setEmail(value)}
      />
      <Button text="Password reset" disable={loading} />
      <Anchor to="/login" text="Log In" />
      <Hr />
      <p className={classes.p}>
        Don't have account?
        <Anchor to="/singup" text="SingUp" />
      </p>
    </Form>
  );
};

export default Forget;
