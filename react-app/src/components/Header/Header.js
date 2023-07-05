import classes from "./Header.module.css";
import Logo from "./Logo";
import CustomButton from "../Common/CustomButton";
import { Link } from "react-router-dom";

export default function Header(props) {
  return (
    <header className={classes.headerContainer}>
      <div className={classes.headerBar}>
        <Logo />
        <Link to="/create-recipe">
          <CustomButton path="/create-recipe" onClick={props.showDialog} info="New recipe" />
        </Link>
      </div>
      <hr />
    </header>
  );
}
