import Anchor from "../Anchor/Anchor";
import Button from "../Button/Button";
import Form from "../Form/Form";
import Hr from "../Hr/Hr";
import Input from "../Input/Input";

const Login: React.FunctionComponent = () => {
  return (
    <Form>
      <Input type="text" placeholder="Enter email address" />
      <Input type="password" placeholder="Enter password" />
      <Button text="Log in" />
      <Anchor text="Forget password" />
      <Hr />
      <Anchor text="Create new account" variant="button" />
    </Form>
  );
};

export default Login;
