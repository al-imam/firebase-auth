import CheckBox from "@components/CheckBox/CheckBox";
import GoTo from "@components/GoTO/GoTo";
import Heading from "@components/Heading/Heading";
import { useAuth } from "@context/AuthContext";
import emailRegex from "@helper/emailRegex";
import Alert from "@utility/Alert/Alert";
import Button from "@utility/Button/Button";
import Form from "@utility/Form/Form";
import Input, { PasswordInput } from "@utility/Input/Input";
import { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { initializerArg, reducer } from "./reducer";

function isEmpty(e: string, p: string, cp: string, curp: string) {
  return (
    e.length === 0 && p.length === 0 && cp.length === 0 && curp.length === 0
  );
}

const Update: React.FunctionComponent = () => {
  const [
    {
      email,
      password,
      confirmPassword,
      error,
      loading,
      success,
      editEmail,
      editPassword,
      currentPassword,
    },
    dispatch,
  ] = useReducer(reducer, initializerArg);

  const { changeEmail, changePassword, currentUser, confirmChanges } =
    useAuth();
  const navigate = useNavigate();

  async function onSubmit(evt: React.FormEvent) {
    evt.preventDefault();
    dispatch({ type: "error", payload: null });

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

    if (currentPassword.length <= 5) {
      return dispatch({
        type: "error",
        payload:
          currentPassword.length === 0
            ? "Current password is required"
            : "Current password will be at lest 6 character!",
      });
    }

    if (editEmail) {
      if (!email.match(emailRegex)) {
        return dispatch({
          type: "error",
          payload:
            email.length === 0
              ? "Email is required"
              : "Enter valid email address",
        });
      }
      if (currentUser?.email === email) {
        return dispatch({ type: "error", payload: "Enter new email ????" });
      }
    }

    if (editPassword) {
      if (password.length <= 5 || confirmPassword.length <= 5) {
        return dispatch({
          type: "error",
          payload:
            password.length === 0
              ? "New passwords are required"
              : "Passwords must be grater then 5 character",
        });
      }

      if (password !== confirmPassword) {
        return dispatch({ type: "error", payload: "Passwords do not match" });
      }
    }

    dispatch({ type: "loading", payload: true });
    dispatch({ type: "error", payload: null });
    dispatch({ type: "success", payload: null });

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

      dispatch({
        type: "success",
        payload:
          "Your changed save successfully????. You will redirect to home page after 5 second.",
      });

      setTimeout(() => navigate("/"), 5000);
    } catch (error: any) {
      dispatch({
        type: "error",
        payload:
          error.code === "auth/wrong-password"
            ? "Current password is wrong try again!"
            : "Something went wrong",
      });
    } finally {
      dispatch({ type: "loading", payload: false });
    }
  }

  function setPassword() {
    dispatch({ type: "error", payload: null });

    if (editPassword === true) {
      dispatch({ type: "confirm-password", payload: "" });
      dispatch({ type: "password", payload: "" });
    }

    dispatch({
      type: "edit-password",
      payload: !editPassword,
    });
  }

  function setEmailAddress() {
    dispatch({ type: "error", payload: "" });

    if (editEmail === true) {
      dispatch({ type: "email", payload: "" });
    }

    dispatch({
      type: "edit-email",
      payload: !editEmail,
    });
  }

  return (
    <>
      <Heading text="Update Profile" />
      <Form onSubmit={onSubmit}>
        {error && <Alert message={error} />}
        {success && <Alert message={success} variant="success" />}
        <PasswordInput
          value={currentPassword}
          placeholder="Current password"
          ac="current-password"
          dispatch={(value: string) =>
            dispatch({
              type: "current-password",
              payload: value,
            })
          }
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
          setValue={setPassword}
          text="Change password?"
        />
        {editPassword && (
          <>
            <PasswordInput
              value={password}
              placeholder="New password"
              ac="new-password"
              dispatch={(value: string) =>
                dispatch({ type: "password", payload: value })
              }
            />
            <PasswordInput
              value={confirmPassword}
              placeholder="New confirm password"
              ac="new-password"
              dispatch={(value: string) =>
                dispatch({ type: "confirm-password", payload: value })
              }
            />
          </>
        )}
        <Button
          text="Save"
          disable={loading || (editEmail === false && editPassword === false)}
        />
      </Form>
      <GoTo to="/" text="Cancel updating profile?" anchorText="Home" />
    </>
  );
};

export default Update;
