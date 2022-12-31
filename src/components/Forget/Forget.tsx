import { useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { emailRegex } from "../SingUp/SingUp";
import Alert from "../Alert/Alert";
import Anchor from "../Anchor/Anchor";
import Button from "../Button/Button";
import Form from "../Form/Form";
import Hr from "../Hr/Hr";
import Input from "../Input/Input";
import classes from "./forget.module.css";
import GoTo from "../GoTO/GoTo";

interface InitializerArg {
  loading: boolean;
  error: null | string;
  success: string | null;
}

const initializerArg: InitializerArg = {
  loading: false,
  error: null,
  success: null,
};

const Forget: React.FunctionComponent = () => {
  const [email, setEmail] = useState("");
  const [{ loading, error, success }, setErrorAndLoading] =
    useState<InitializerArg>(initializerArg);

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
      setErrorAndLoading((p) => ({
        loading: true,
        error: null,
        success: null,
      }));

      await resetPassword(email);

      setErrorAndLoading((p) => ({
        error: null,
        loading: false,
        success: "Password reset link sent on your email address",
      }));
    } catch (error: any) {
      console.dir(error);
      setErrorAndLoading({
        loading: false,
        error:
          error.code === "auth/user-not-found"
            ? "No account found with this email, singUp"
            : "something went wrong",
        success: null,
      });
    }
  }

  return (
    <Form onSubmit={onSubmit}>
      <h1 className={classes.h1}>Password reset</h1>
      {error && <Alert message={error} />}
      {success && <Alert message={success} variant="success" />}
      <Input
        type="text"
        placeholder="Email address"
        value={email}
        dispatch={(value: string) => setEmail(value)}
      />
      <Button text="Password reset" disable={loading || Boolean(success)} />
      <Anchor to="/login" text="Log In" />
      <Hr />
      <GoTo to="/singup" text="Don't have account?" anchorText="SingUp" />
    </Form>
  );
};

export default Forget;
