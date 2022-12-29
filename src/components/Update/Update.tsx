import { useReducer, useState } from "react";
import Anchor from "../Anchor/Anchor";
import Button from "../Button/Button";
import Form from "../Form/Form";
import Input from "../Input/Input";
import Alert from "../Alert/Alert";
import classes from "./update.module.css";
import { initializerArg, reducer } from "../SingUp/reducer";
import { useAuth } from "../../Context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";

export const emailRegex =
  /^[a-zA-Z]([a-zA-Z0-9\.]){2,}@[a-z]{3,7}\.[a-z]{2,5}$/;

function isEmpty(e: string, p: string, cp: string) {
  return e.length === 0 || p.length === 0 || cp.length === 0;
}

const SingUp: React.FunctionComponent = () => {
  const [{ email, password, confirmPassword, error, loading }, dispatch] =
    useReducer(reducer, initializerArg);
  const [check, setCheck] = useState(false);
  const { singUp, currentUser } = useAuth();
  const navigate = useNavigate();

  async function onSubmit(evt: React.FormEvent) {
    evt.preventDefault();

    if (check && isEmpty(email, password, confirmPassword)) {
      return dispatch({
        type: "error",
        payload: "Email, password, confirm password required!",
      });
    }

    if (!email.match(emailRegex)) {
      return dispatch({
        type: "error",
        payload:
          email.length === 0
            ? "Email is required"
            : "Enter valid email address",
      });
    }

    if (check && Boolean(password.length <= 5 || confirmPassword.length <= 5)) {
      return dispatch({
        type: "error",
        payload: "Password must be 6 character or higher",
      });
    }

    if (check && password !== confirmPassword) {
      return dispatch({ type: "error", payload: "Passwords do not match" });
    }

    if (currentUser?.email === email) {
      return dispatch({ type: "error", payload: "Enter new email 😒" });
    }
  }

  return (
    <Form onSubmit={onSubmit}>
      <h1 className={classes.h1}>Update profile</h1>
      {error && <Alert message={error} />}
      <Input
        value={email}
        type="text"
        placeholder="New email"
        dispatch={(value: string) =>
          dispatch({ type: "email", payload: value })
        }
      />
      <div className={classes.checkGroup}>
        <input
          type="checkbox"
          id="show"
          checked={check}
          onChange={() => setCheck((c) => !c)}
        />
        <label htmlFor="show">Change password?</label>
      </div>
      {check && (
        <>
          <Input
            value={password}
            type="password"
            placeholder="New password"
            dispatch={(value: string) =>
              dispatch({ type: "password", payload: value })
            }
          />
          <Input
            value={confirmPassword}
            type="password"
            placeholder="New confirm password"
            dispatch={(value: string) =>
              dispatch({ type: "confirmPassword", payload: value })
            }
          />
        </>
      )}
      <Button text="Update profile" disable={loading} />
      <p className={classes.p}>
        cancel updating profile?
        <Anchor to="/" text="Home" />
      </p>
    </Form>
  );
};

export default SingUp;
