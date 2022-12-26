interface ButtonProps {
  text: string;
}

const Button: React.FunctionComponent<ButtonProps> = ({ text }) => (
  <button type="submit">{text}</button>
);

export default Button;
