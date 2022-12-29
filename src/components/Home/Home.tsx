import Button from "../Button/Button";
import Hr from "../Hr/Hr";
import classes from "./home.module.css";
import profile from "../../assets/bighead.svg";
import { useAuth } from "../../Context/AuthContext";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Alert from "../Alert/Alert";

const Home: React.FunctionComponent = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const { currentUser, logOut } = useAuth()!;
  const navigate = useNavigate();

  async function handleLogOut() {
    setLoading(true);
    setError(null);
    try {
      await logOut();
      navigate("/login", { replace: true });
    } catch (error) {
      setError("something went wrong try again");
    }
    setLoading(false);
  }

  return (
    <div className={classes.home}>
      <img src={profile} className={classes.img} />
      <p className={classes.name}>
        {currentUser && "Email - " + currentUser.email}
      </p>
      <Link className={classes.a} to="/update-profile">
        <Button text="Update profile" />
      </Link>
      <Hr />
      {error && <Alert message={error} />}
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
