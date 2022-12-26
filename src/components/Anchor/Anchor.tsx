import { Link } from "react-router-dom";
import classes from "./anchor.module.css";

interface AnchorProps {
  text: string;
  to?: string;
  variant?: "button" | "link";
}

const Anchor: React.FunctionComponent<AnchorProps> = ({
  text,
  to = "#",
  variant = "link",
}) => (
  <Link to={to} className={`${classes.default} ${classes[variant]}`}>
    {text}
  </Link>
);

export default Anchor;
