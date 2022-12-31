import classes from "./heading.module.css";

const Heading: React.FunctionComponent<{ text: string }> = ({ text }) => (
  <div className={classes.heading}>
    <h1 className={classes.h1}>{text}</h1>
  </div>
);

export default Heading;
