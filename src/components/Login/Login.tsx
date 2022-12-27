import { useReducer } from "react";
import { useAuth } from "../../Context/AuthContext";
import Anchor from "../Anchor/Anchor";
import Button from "../Button/Button";
import Form from "../Form/Form";
import Hr from "../Hr/Hr";
import Input from "../Input/Input";
import classes from "./login.module.css";
import { emailRegex } from "../SingUp/SingUp";
import { initializerArg, reducer } from "./reducer";

function isEmpty(e: string, p: string) {
  return e.length === 0 || p.length === 0;
}

const Login: React.FunctionComponent = () => {
  const [{ email, password, error, loading }, dispatch] = useReducer(
    reducer,
    initializerArg
  );
  const { singUp } = useAuth()!;

  async function onSubmit(evt: React.FormEvent) {
    evt.preventDefault();

    if (isEmpty(email, password)) {
      return dispatch({
        type: "error",
        payload: "Email and password is required!",
      });
    }

    if (!email.match(emailRegex)) {
      return dispatch({ type: "error", payload: "Enter valid email address" });
    }

    try {
      dispatch({ type: "loading", payload: "yes" });
      dispatch({ type: "error", payload: "" });
      await singUp(email, password);
    } catch (error) {
      console.log(error);
      return dispatch({ type: "error", payload: "something went wrong" });
    }
    dispatch({ type: "loading", payload: "no" });
  }

  return (
    <Form onSubmit={onSubmit}>
      <h1 className={classes.h1}>Login Form</h1>
      <Input
        type="text"
        placeholder="Email address"
        value={email}
        dispatch={(value: string) =>
          dispatch({ type: "email", payload: value })
        }
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        dispatch={(value: string) =>
          dispatch({ type: "password", payload: value })
        }
      />
      <Button text="Log in" />
      <Anchor to="/forget-password" text="Forget password" />
      <Hr />
      <Anchor to="/singup" text="Create new account" variant="button" />
    </Form>
  );
};

export default Login;
