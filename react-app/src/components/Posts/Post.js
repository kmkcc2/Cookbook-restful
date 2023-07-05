import classes from "./Post.module.css";
import { Link } from "react-router-dom";

export default function Post(props) {
  return (
    <Link to={"/recipe/" + props.id}>
      <div className={classes.recipe}>
        <div className={classes.flexSpaceBetween}>
          <p className={classes.title}>{props.title}</p>
          <p className={classes.author}>{props.author}</p>
        </div>
        <hr />
        <p className={classes.description}>{props.description}</p>
      </div>
    </Link>
  );
}
