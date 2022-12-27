import { useReducer } from "react";
import Anchor from "../Anchor/Anchor";
import Button from "../Button/Button";
import Form from "../Form/Form";
import Input from "../Input/Input";
import classes from "./singUp.module.css";
import { initializerArg, reducer } from "./reducer";

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
