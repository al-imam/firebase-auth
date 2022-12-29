import { useReducer, useState } from "react";
import Anchor from "../Anchor/Anchor";
import Button from "../Button/Button";
import Form from "../Form/Form";
import Input from "../Input/Input";
import Alert from "../Alert/Alert";
import classes from "./update.module.css";
import { initializerArg, reducer } from "../SingUp/reducer";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

export const emailRegex =
  /^[a-zA-Z]([a-zA-Z0-9\.]){2,}@[a-z]{3,7}\.[a-z]{2,5}$/;

function isEmpty(e: string, p: string, cp: string, curp: string) {
  return (
    e.length === 0 || p.length === 0 || cp.length === 0 || curp.length === 0
  );
}

const Update: React.FunctionComponent = () => {
  const [{ email, password, confirmPassword, error, loading }, dispatch] =
    useReducer(reducer, initializerArg);
  const [checkPassWord, setCheckPass] = useState(false);
  const [currentPassWord, setCurrentPassWord] = useState("");
  const { changeEmail, changePassword, currentUser, confirmChanges } =
    useAuth();

  const navigate = useNavigate();

  async function onSubmit(evt: React.FormEvent) {
    evt.preventDefault();

    if (
      checkPassWord &&
      isEmpty(email, password, confirmPassword, currentPassWord)
    ) {
      return dispatch({
        type: "error",
        payload: "Email, currentPassWord, password, confirmPassword required!",
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

    if (currentPassWord.length <= 5) {
      return dispatch({
        type: "error",
        payload:
          currentPassWord.length === 0
            ? "currentPassWord is required"
            : "currentPassWord will be at lest 6 character",
      });
    }

    if (
      checkPassWord &&
      Boolean(password.length <= 5 || confirmPassword.length <= 5)
    ) {
      return dispatch({
        type: "error",
        payload: "Password must be 6 character or higher",
      });
    }

    if (checkPassWord && password !== confirmPassword) {
      return dispatch({ type: "error", payload: "Passwords do not match" });
    }

    if (currentUser?.email === email) {
      return dispatch({ type: "error", payload: "Enter new email 😒" });
    }

    dispatch({ type: "loading", payload: "yes" });
    dispatch({ type: "error", payload: "" });

    try {
      await confirmChanges(currentPassWord);
    } catch (error: any) {
      dispatch({
        type: "error",
        payload:
          error.code === "auth/wrong-password"
            ? "Current password is wrong"
            : "Something went wrong",
      });
      dispatch({ type: "loading", payload: "" });
      return console.dir(error);
    }

    try {
      await changeEmail(email);
    } catch (error) {
      console.dir(error);
      dispatch({ type: "error", payload: "failed to re log in new password" });
      return dispatch({ type: "loading", payload: "" });
    }

    try {
      await confirmChanges(currentPassWord);
    } catch (error) {
      dispatch({
        type: "error",
        payload: "Something went wrong",
      });
      dispatch({ type: "loading", payload: "" });
      return console.dir(error);
    }

    try {
      await changePassword(password);
    } catch (error) {
      console.dir(error);
      dispatch({ type: "error", payload: "failed to re log in new password" });
    }

    dispatch({ type: "loading", payload: "" });
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
      <Input
        value={currentPassWord}
        type="password"
        placeholder="Current password"
        dispatch={(value: string) => setCurrentPassWord(value)}
      />
      <div className={classes.checkGroup}>
        <input
          type="checkbox"
          id="show"
          checked={checkPassWord}
          onChange={() => setCheckPass((c) => !c)}
        />
        <label htmlFor="show">Change password?</label>
      </div>
      {checkPassWord && (
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

export default Update;
