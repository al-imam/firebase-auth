import { useReducer } from "react";
import Anchor from "../Anchor/Anchor";
import Button from "../Button/Button";
import Form from "../Form/Form";
import Input from "../Input/Input";
import Alert from "../Alert/Alert";
import classes from "./singUp.module.css";
import { initializerArg, reducer } from "./reducer";
import { useAuth } from "../../Context/AuthContext";

const emailRegex = /^[a-zA-Z]([a-zA-Z0-9\.]){2,}@[a-z]{3,7}\.[a-z]{2,5}$/;

function isEmpty(e: string, p: string, cp: string) {
  return e.length === 0 || p.length === 0 || cp.length === 0;
}

const SingUp: React.FunctionComponent = () => {
  const [{ email, password, confirmPassword, error }, dispatch] = useReducer(
    reducer,
    initializerArg
  );
  const { singUp } = useAuth()!;

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

    if (password !== confirmPassword) {
      return dispatch({ type: "error", payload: "Passwords do not match" });
    }

    try {
      dispatch({ type: "error", payload: "" });
      await singUp(email, password);
    } catch (error) {
      console.log(error);
      return dispatch({ type: "error", payload: "something went wrong" });
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
        dispatch={(value: string) =>
          dispatch({ type: "email", payload: value })
        }
      />
      <Input
        value={password}
        type="password"
        placeholder="Password"
        dispatch={(value: string) =>
          dispatch({ type: "password", payload: value })
        }
      />
      <Input
        value={confirmPassword}
        type="password"
        placeholder="Confirm password"
        dispatch={(value: string) =>
          dispatch({ type: "confirmPassword", payload: value })
        }
      />
      <Button text="Sing Up" />
      <p className={classes.p}>
        Already have account?
        <Anchor to="/login" text="Login" />
      </p>
    </Form>
  );
};

export default SingUp;
