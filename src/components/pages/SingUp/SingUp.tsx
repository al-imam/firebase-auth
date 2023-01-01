import GoTo from "@components/GoTO/GoTo";
import Heading from "@components/Heading/Heading";
import { useAuth } from "@context/AuthContext";
import emailRegex from "@helper/emailRegex";
import Alert from "@utility/Alert/Alert";
import Button from "@utility/Button/Button";
import Form from "@utility/Form/Form";
import Input from "@utility/Input/Input";
import { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { initializerArg, reducer } from "./reducer";

function isEmpty(e: string, p: string, cp: string) {
  return e.length === 0 || p.length === 0 || cp.length === 0;
}

const SingUp: React.FunctionComponent = () => {
  const [{ email, password, confirmPassword, error, loading }, dispatch] =
    useReducer(reducer, initializerArg);
  const { singUp } = useAuth()!;
  const navigate = useNavigate();

  async function onSubmit(evt: React.FormEvent) {
    evt.preventDefault();

    if (isEmpty(email, password, confirmPassword)) {
      return dispatch({
        type: "error",
        payload: "Email, password, confirm password required!",
      });
    }

    if (!email.match(emailRegex)) {
      return dispatch({ type: "error", payload: "Enter valid email address" });
    }

    if (password.length <= 5 || confirmPassword.length <= 5) {
      return dispatch({
        type: "error",
        payload: "Password must be 6 character or higher",
      });
    }

    if (password !== confirmPassword) {
      return dispatch({ type: "error", payload: "Passwords do not match" });
    }

    dispatch({ type: "error", payload: null });
    dispatch({ type: "loading", payload: true });

    try {
      await singUp(email, password);
      navigate("/", { replace: true });
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        return dispatch({ type: "error", payload: "Email already in use!" });
      }
      return dispatch({ type: "error", payload: "something went wrong" });
    } finally {
      dispatch({ type: "loading", payload: false });
    }
  }

  return (
    <>
      <Heading text="Singup Form" />
      <Form onSubmit={onSubmit}>
        {error && <Alert message={error} />}
        <Input
          value={email}
          type="text"
          placeholder="Email"
          ac="username email"
          dispatch={(value: string) =>
            dispatch({ type: "email", payload: value })
          }
        />
        <Input
          value={password}
          type="password"
          placeholder="Password"
          ac="new-password"
          dispatch={(value: string) =>
            dispatch({ type: "password", payload: value })
          }
        />
        <Input
          value={confirmPassword}
          type="password"
          placeholder="Confirm password"
          ac="new-password"
          dispatch={(value: string) =>
            dispatch({ type: "confirmPassword", payload: value })
          }
        />
        <Button text="Sing Up" disable={loading} />
      </Form>
      <GoTo to="/login" text="Already have account?" anchorText="LogIn" />
    </>
  );
};

export default SingUp;
