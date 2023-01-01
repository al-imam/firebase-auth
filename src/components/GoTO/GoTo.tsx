import Anchor from "@utility/Anchor/Anchor";
import classes from "./goto.module.css";

interface GoToProps {
  text: string;
  to: string;
  anchorText: string;
}

const GoTo: React.FunctionComponent<GoToProps> = ({
  text = "",
  to,
  anchorText,
}) => {
  return (
    <p className={classes.p}>
      {text}
      <Anchor to={to} text={anchorText} />
    </p>
  );
};

export default GoTo;
