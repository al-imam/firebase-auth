import { Link } from "react-router-dom";
import classes from "./anchor.module.css";

interface AnchorProps {
  text: string;
  to?: string;
  left?: boolean;
}

const Anchor: React.FunctionComponent<AnchorProps> = ({
  text,
  to = "#",
  left,
}) => (
  <Link to={to} className={`${classes.link} ${left ? classes.left : ""}`}>
    {text}
  </Link>
);

export default Anchor;
