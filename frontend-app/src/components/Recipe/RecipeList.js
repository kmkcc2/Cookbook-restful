import { Link } from "react-router-dom";
import "./RecipeList.css";
export default function RecipeList(props) {
  return (
    <Link to={"/recipes/" + props.id}>
      <div className="recipe-list-component">
        <p>{props.title}</p>
        <p>{props.description}</p>
        <p>{props.products}</p>
      </div>
    </Link>
  );
}
