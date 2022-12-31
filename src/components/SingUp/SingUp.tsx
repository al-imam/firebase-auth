import { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import emailRegex from "../../util/emailRegex";
import Alert from "../Alert/Alert";
import Button from "../Button/Button";
import Form from "../Form/Form";
import GoTo from "../GoTO/GoTo";
import Input from "../Input/Input";
import { initializerArg, reducer } from "./reducer";
import classes from "./singUp.module.css";

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
    <Form onSubmit={onSubmit}>
      <h1 className={classes.h1}>SingUp Form</h1>
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
      <GoTo to="/login" text="Already have account?" anchorText="LogIn" />
    </Form>
  );
};

export default SingUp;
