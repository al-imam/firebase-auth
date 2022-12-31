import GoTo from "../GoTO/GoTo";
import CheckBox from "../CheckBox/CheckBox";
import { useReducer, useState } from "react";
import Button from "../Button/Button";
import Form from "../Form/Form";
import Input from "../Input/Input";
import Alert from "../Alert/Alert";
import classes from "./update.module.css";
import { initializerArg, reducer } from "./reducer";
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
  const [editPassword, setEditPassword] = useState(true);
  const [editEmail, setEditEmail] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const { changeEmail, changePassword, currentUser, confirmChanges } =
    useAuth();

  const [success, setSuccess] = useState<null | string>(null);

  const navigate = useNavigate();

  async function onSubmit(evt: React.FormEvent) {
    evt.preventDefault();
    dispatch({ type: "error", payload: "" });

    if (
      editPassword &&
      editEmail &&
      isEmpty(email, password, confirmPassword, currentPassword)
    ) {
      return dispatch({
        type: "error",
        payload:
          "Email, current-password, password and confirm-password required!",
      });
    }

    if (editEmail) {
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

    if (editPassword) {
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

    if (currentPassword.length <= 5) {
      return dispatch({
        type: "error",
        payload:
          currentPassword.length === 0
            ? `Current password is required`
            : "Current password will be at lest 6 character!",
      });
    }

    dispatch({ type: "loading", payload: "yes" });
    dispatch({ type: "error", payload: "" });
    setSuccess(null);

    try {
      if (editEmail) {
        await confirmChanges(currentPassword).then(async () => {
          await changeEmail(email);
        });
      }

      if (editPassword) {
        await confirmChanges(currentPassword).then(async () => {
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
    setEditPassword((e) => {
      if (e === true) {
        dispatch({ type: "confirmPassword", payload: "" });
        dispatch({ type: "password", payload: "" });
      }
      return !e;
    });
  }

  function setEmailAddress() {
    dispatch({ type: "error", payload: "" });
    setEditEmail((e) => {
      if (e === true) {
        dispatch({ type: "email", payload: "" });
      }
      return !e;
    });
  }

  return (
    <Form onSubmit={onSubmit}>
      <h1 className={classes.h1}>Update profile</h1>
      {error && <Alert message={error} />}
      {success && <Alert message={success} variant="success" />}
      <Input
        value={currentPassword}
        type="password"
        placeholder="Current password"
        ac="current-password"
        dispatch={(value: string) => setCurrentPassword(value)}
      />
      <CheckBox
        value={editEmail}
        setValue={setEmailAddress}
        text="Change email?"
      />
      {editEmail && (
        <Input
          value={email}
          type="email"
          placeholder="New email"
          ac="username email"
          dispatch={(value: string) =>
            dispatch({ type: "email", payload: value })
          }
        />
      )}
      <CheckBox
        value={editPassword}
        setValue={setPass}
        text="Change password?"
      />
      {editPassword && (
        <>
          <Input
            value={password}
            type="password"
            placeholder="New password"
            ac="new-password"
            dispatch={(value: string) =>
              dispatch({ type: "password", payload: value })
            }
          />
          <Input
            value={confirmPassword}
            type="password"
            placeholder="New confirm password"
            ac="new-password"
            dispatch={(value: string) =>
              dispatch({ type: "confirmPassword", payload: value })
            }
          />
        </>
      )}
      <Button
        text="Save"
        disable={loading || (editEmail === false && editPassword === false)}
      />
      <GoTo to="/" text="Cancel updating profile?" anchorText="Home" />
    </Form>
  );
};

export default Update;
