import { Link } from "react-router-dom";

interface AnchorProps {
  text: string;
  to: string;
  variant: "button" | "link";
}

const Anchor: React.FunctionComponent<AnchorProps> = ({
  text,
  to = "#",
  variant = "link",
}) => <Link to={to}>{text}</Link>;

export default Anchor;
