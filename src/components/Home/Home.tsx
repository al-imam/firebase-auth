import Button from "../Button/Button";
import Hr from "../Hr/Hr";
import Anchor from "../Anchor/Anchor";
import classes from "./home.module.css";
import profile from "../../assets/bighead.svg";

const Home: React.FunctionComponent = () => {
  return (
    <div className={classes.home}>
      <img src={profile} className={classes.img} />
      <p className={classes.name}>Email - alimam01828@gmail.com</p>
      <Button text="Update profile" />
      <Hr />
      <Anchor text="Log out" />
    </div>
  );
};

export default Home;
