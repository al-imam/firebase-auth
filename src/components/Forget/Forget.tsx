import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import Alert from "../Alert/Alert";
import Button from "../Button/Button";
import Form from "../Form/Form";
import Hr from "../Hr/Hr";
import Input from "../Input/Input";
import classes from "./forget.module.css";
import GoTo from "../GoTO/GoTo";
import emailRegex from "../../util/emailRegex";
import Heading from "../Heading/Heading";

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
  const [{ loading, error, success }, setErrorLoadingAndSuccess] =
    useState<InitializerArg>(initializerArg);

  const { resetPassword } = useAuth();

  const navigate = useNavigate();

  async function onSubmit(evt: React.FormEvent) {
    evt.preventDefault();

    if (!email.match(emailRegex)) {
      return setErrorLoadingAndSuccess((p) => ({
        ...p,
        error: email.length === 0 ? "Email is required" : "Email is not valid",
      }));
    }

    try {
      setErrorLoadingAndSuccess((p) => ({
        loading: true,
        error: null,
        success: null,
      }));

      await resetPassword(email);

      setErrorLoadingAndSuccess((p) => ({
        error: null,
        loading: false,
        success:
          "Password reset link sent successfully check your mail box.😊 you will redirect to login page after 5 second.",
      }));

      setTimeout(() => navigate("/login"), 5000);
    } catch (error: any) {
      console.dir(error);
      setErrorLoadingAndSuccess({
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
    <>
      <Heading text="Password Reset Form" />
      <Form onSubmit={onSubmit}>
        {error && <Alert message={error} />}
        {success && <Alert message={success} variant="success" />}
        <Input
          type="text"
          placeholder="Email address"
          value={email}
          ac="username email"
          dispatch={(value: string) => setEmail(value)}
        />
        <Button text="Password reset" disable={loading || Boolean(success)} />
      </Form>
      <GoTo to="/singup" text="Don't have account?" anchorText="SingUp" />
    </>
  );
};

export default Forget;
