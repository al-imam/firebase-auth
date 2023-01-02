import { useState } from "react";
import EyeOff from "./eye-off.svg";
import Eye from "./eye.svg";
import classes from "./input.module.css";

interface InputProps {
  type: string;
  placeholder: string;
  dispatch: (value: string) => void;
  value: string;
  ac?: string;
}

const Input: React.FunctionComponent<InputProps> = ({
  type = "text",
  placeholder,
  dispatch,
  value,
  ac,
}) => (
  <input
    value={value}
    onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
      dispatch(evt.currentTarget.value)
    }
    className={classes.inputs + " " + classes.text}
    type={type}
    placeholder={placeholder}
    autoComplete={ac}
    required
  />
);

export default Input;

type PasswordInputProps = Omit<InputProps, "type">;

export const PasswordInput: React.FunctionComponent<PasswordInputProps> = ({
  placeholder,
  dispatch,
  value,
  ac,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={classes.group}>
      <input
        className={classes.inputs + " " + classes.password}
        value={value}
        onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
          dispatch(evt.currentTarget.value)
        }
        type={open ? "text" : "password"}
        placeholder={placeholder}
        autoComplete={ac}
        required
      />
      <button
        className={classes.seen}
        type="button"
        onClick={() => setOpen((p) => !p)}
      >
        <img className={classes.eye} src={open ? Eye : EyeOff} alt="Eye" />
      </button>
    </div>
  );
};
