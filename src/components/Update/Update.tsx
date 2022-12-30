import React, { useReducer, useState } from "react";
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
    e.length === 0 && p.length === 0 && cp.length === 0 && curp.length === 0
  );
}

const Update: React.FunctionComponent = () => {
  const [{ email, password, confirmPassword, error, loading }, dispatch] =
    useReducer(reducer, initializerArg);
  const [checkPassWord, setCheckPass] = useState(true);
  const [checkEmail, setCheckEmail] = useState(false);
  const [currentPassWord, setCurrentPassWord] = useState("");
  const { changeEmail, changePassword, currentUser, confirmChanges } =
    useAuth();

  const [success, setSuccess] = useState<null | string>(null);

  const navigate = useNavigate();

  async function onSubmit(evt: React.FormEvent) {
    evt.preventDefault();
    dispatch({ type: "error", payload: "" });

    if (
      checkPassWord &&
      checkEmail &&
      isEmpty(email, password, confirmPassword, currentPassWord)
    ) {
      return dispatch({
        type: "error",
        payload:
          "Email, current-password, password and confirm-password required!",
      });
    }

    if (checkEmail) {
      if (!email.match(emailRegex)) {
        return dispatch({
          type: "error",
          payload:
            email.length === 0
              ? "Email and current-password is required"
              : "Enter valid email address",
        });
      }
      if (currentUser?.email === email) {
        return dispatch({ type: "error", payload: "Enter new email 😒" });
      }
    }

    if (checkPassWord) {
      if (password.length <= 5 || confirmPassword.length <= 5) {
        return dispatch({
          type: "error",
          payload:
            password.length === 0
              ? "New passwords and current password is required"
              : "Passwords must be grater then 5 character",
        });
      }

      if (password !== confirmPassword) {
        return dispatch({ type: "error", payload: "Passwords do not match" });
      }
    }

    if (currentPassWord.length <= 5) {
      return dispatch({
        type: "error",
        payload:
          currentPassWord.length === 0
            ? `Current password is required`
            : "Current password will be at lest 6 character!",
      });
    }

    dispatch({ type: "loading", payload: "yes" });
    dispatch({ type: "error", payload: "" });
    setSuccess(null);

    try {
      if (checkEmail) {
        await confirmChanges(currentPassWord).then(async () => {
          await changeEmail(email);
        });
      }

      if (checkPassWord) {
        await confirmChanges(currentPassWord).then(async () => {
          await changePassword(password);
        });
      }

      setSuccess(
        "Your changed save successfully😊. You will redirect to home page after 5 second."
      );

      setTimeout(() => navigate("/"), 5000);
    } catch (error: any) {
      console.dir(error);

      dispatch({
        type: "error",
        payload:
          error.code === "auth/wrong-password"
            ? "Current password is wrong try again!"
            : "Something went wrong",
      });
    } finally {
      dispatch({ type: "loading", payload: "" });
    }
  }

  function setPass() {
    dispatch({ type: "error", payload: "" });
    setCheckPass((p) => !p);
  }

  function setMail() {
    dispatch({ type: "error", payload: "" });
    setCheckEmail((e) => !e);
  }

  return (
    <Form onSubmit={onSubmit}>
      <h1 className={classes.h1}>Update profile</h1>
      {error && <Alert message={error} />}
      {success && <Alert message={success} variant="success" />}

      <Input
        value={currentPassWord}
        type="password"
        placeholder="Current password"
        dispatch={(value: string) => setCurrentPassWord(value)}
      />
      <div className={classes.checkGroup}>
        <input
          type="checkbox"
          id="show-email"
          checked={checkEmail}
          onChange={setMail}
        />
        <label htmlFor="show-email">Change email?</label>
      </div>
      {checkEmail && (
        <Input
          value={email}
          type="text"
          placeholder="New email"
          dispatch={(value: string) =>
            dispatch({ type: "email", payload: value })
          }
        />
      )}
      <div className={classes.checkGroup}>
        <input
          type="checkbox"
          id="show-password"
          checked={checkPassWord}
          onChange={setPass}
        />
        <label htmlFor="show-password">Change password?</label>
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
      <Button
        text="Update profile"
        disable={loading || (checkEmail === false && checkPassWord === false)}
      />
      <p className={classes.p}>
        Cancel updating profile?
        <Anchor to="/" text="Home" />
      </p>
    </Form>
  );
};

export default Update;
