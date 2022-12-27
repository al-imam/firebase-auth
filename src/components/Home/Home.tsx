import Button from "../Button/Button";
import Hr from "../Hr/Hr";
import Anchor from "../Anchor/Anchor";
import classes from "./home.module.css";
import profile from "../../assets/bighead.svg";
import { useAuth } from "../../Context/AuthContext";

const Home: React.FunctionComponent = () => {
  const { currentUser } = useAuth()!;

  return (
    <div className={classes.home}>
      <img src={profile} className={classes.img} />
      <p className={classes.name}>
        {currentUser ? "Email - " + currentUser.email : "Loading......"}
      </p>
      <Button text="Update profile" />
      <Hr />
      <Anchor text="Log out" />
    </div>
  );
};

export default Home;
