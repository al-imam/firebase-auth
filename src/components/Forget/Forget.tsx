import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { emailRegex } from "../SingUp/SingUp";
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
  const [{ loading, error }, setErrorAndLoading] =
    useState<InitializerArg>(initializerArg);

  const navigate = useNavigate();
  const { resetPassword } = useAuth();

  async function onSubmit(evt: React.FormEvent) {
    evt.preventDefault();

    if (!email.match(emailRegex)) {
      return setErrorAndLoading((p) => ({
        ...p,
        error: email.length === 0 ? "Email is required" : "Email is not valid",
      }));
    }

    try {
      setErrorAndLoading((p) => ({ loading: true, error: null }));
      await resetPassword(email);
      navigate("/login", { replace: true });
    } catch (error: any) {
      setErrorAndLoading({ loading: false, error: "something went wrong" });
    }

    setErrorAndLoading((p) => ({ ...p, loading: false }));
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
