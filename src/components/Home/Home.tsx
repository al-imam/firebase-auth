import Button from "../Button/Button";
import Hr from "../Hr/Hr";
import classes from "./home.module.css";
import profile from "../../assets/bighead.svg";
import { useAuth } from "../../Context/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FunctionComponent = () => {
  const [loading, setLoading] = useState(false);
  const { currentUser, logOut } = useAuth()!;
  const navigate = useNavigate();

  async function handleLogOut() {
    setLoading(true);
    await logOut();
    navigate("/login");
    setLoading(false);
  }

  return (
    <div className={classes.home}>
      <img src={profile} className={classes.img} />
      <p className={classes.name}>
        {currentUser ? "Email - " + currentUser.email : "Loading......"}
      </p>
      <Button text="Update profile" />
      <Hr />
      <button
        className={classes.link}
        disabled={loading}
        onClick={handleLogOut}
      >
        Log Out
      </button>
    </div>
  );
};

export default Home;
