import { useReducer } from "react";
import Anchor from "../Anchor/Anchor";
import Button from "../Button/Button";
import Form from "../Form/Form";
import Input from "../Input/Input";
import classes from "./singUp.module.css";

interface InitState {
  email: string;
  password: string;
  confirmPassword: string;
}

const initializerArg: InitState = {
  email: "",
  password: "",
  confirmPassword: "",
};

interface ACTION {
  type: "email" | "password" | "confirmPassword";
  payload: string;
}

function reducer(state: InitState, action: ACTION) {
  const { type, payload } = action;

  switch (type) {
    case "email":
      return {
        ...state,
        email: payload,
      };

    case "password":
      return {
        ...state,
        password: payload,
      };

    case "confirmPassword":
      return {
        ...state,
        confirmPassword: payload,
      };

    default:
      throw new Error("type don't exist ");
  }
}

const SingUp: React.FunctionComponent = () => {
  const [{ email, password, confirmPassword }, dispatch] = useReducer(
    reducer,
    initializerArg
  );

  return (
    <Form>
      <h1 className={classes.h1}>SingUp Form</h1>
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
