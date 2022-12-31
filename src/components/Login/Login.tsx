import { useReducer } from "react";
import { useAuth } from "../../Context/AuthContext";
import Anchor from "../Anchor/Anchor";
import Button from "../Button/Button";
import Form from "../Form/Form";
import Hr from "../Hr/Hr";
import Input from "../Input/Input";
import classes from "./login.module.css";
import { initializerArg, reducer } from "./reducer";
import Alert from "../Alert/Alert";
import { useNavigate } from "react-router-dom";
import GoTo from "../GoTO/GoTo";
import emailRegex from "../../util/emailRegex";

function isEmpty(e: string, p: string) {
  return e.length === 0 || p.length === 0;
}

const Login: React.FunctionComponent = () => {
  const [{ email, password, error, loading }, dispatch] = useReducer(
    reducer,
    initializerArg
  );
  const { login } = useAuth()!;
  const navigate = useNavigate();

  async function onSubmit(evt: React.FormEvent) {
    evt.preventDefault();

    if (isEmpty(email, password)) {
      return dispatch({
        type: "error",
        payload: "Email and password is required!",
      });
    }

    if (password.length <= 5) {
      return dispatch({
        type: "error",
        payload: "Password contain at last 6 character",
      });
    }

    if (!email.match(emailRegex)) {
      return dispatch({ type: "error", payload: "Enter valid email address" });
    }

    try {
      dispatch({ type: "loading", payload: "yes" });
      dispatch({ type: "error", payload: "" });

      await login(email, password);
      navigate("/", { replace: true });
    } catch (error: any) {
      console.dir(error);

      dispatch({ type: "loading", payload: "" });

      if (["auth/user-not-found", "auth/wrong-password"].includes(error.code)) {
        return dispatch({
          type: "error",
          payload: "Email and password not match",
        });
      }

      return dispatch({ type: "error", payload: "something went wrong" });
    }

    dispatch({ type: "loading", payload: "" });
  }

  return (
    <Form onSubmit={onSubmit}>
      <h1 className={classes.h1}>Login Form</h1>
      {error && <Alert message={error} />}
      <Input
        type="email"
        placeholder="Email address"
        ac="username email"
        value={email}
        dispatch={(value: string) =>
          dispatch({ type: "email", payload: value })
        }
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        ac="current-password"
        dispatch={(value: string) =>
          dispatch({ type: "password", payload: value })
        }
      />
      <Anchor to="/forget-password" text="Forget Password?" left={true} />
      <Button text="Log in" disable={loading} />
      <Hr />
      <GoTo to="/singup" text="Don't have account?" anchorText="SingUp" />
    </Form>
  );
};

export default Login;
