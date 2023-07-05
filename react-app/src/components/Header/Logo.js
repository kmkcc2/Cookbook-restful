import classes from "./Logo.module.css";
import logo from "../../icons/cookbook.png";
import { Link } from "react-router-dom";
export default function Logo() {
  return (
    <Link to="/">
      {" "}
      <div className={classes.logo}>
        <img src={logo} alt="logo" />
        <p>Cookbook</p>
      </div>{" "}
    </Link>
  );
}
