import { useLoaderData } from "react-router";
import classes from "./RecipeDetails.module.css";
import bin from "../icons/trash-bin.png";
import edit from "../icons/editing.png";
import { Link } from "react-router-dom";
import { Outlet } from "react-router";
export default function RecipeDetails() {

  function onEditHandler() {}

  const recipe = useLoaderData();
  if (recipe === null) {
    return <p> Recipe not found 404</p>;
  } else {
    return (
      <div className={classes.container}>
        <Outlet />
        <div className={classes.subMenu}>
          <button className={classes.editButton} onClick={onEditHandler}>
            <img src={edit} alt="edit" />
          </button>
          <Link to="delete"><button className={classes.deleteButton}>
            <img src={bin} alt="trash" />
          </button></Link>
        </div>
        <div className={classes.flexRow}>
          <h1>{recipe.title}</h1>
          <h3>author: {recipe.author !== null ? recipe.author : "unknown"}</h3>
        </div>

        <div className={classes.flexColumns}>
          <div className={classes.firstColumn}>{recipe.description}</div>
          <div className={classes.secondColumn}>
            <h2>Ingredients: </h2>
            {/* <ul>{recipe.products.map((product) => {return <li>product</li>} )}</ul> */}
            <ul>
              {recipe.products !== null && recipe.products.split(" ").map((product) => {
                return <li>{product}</li>;
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export async function loader({ params }) {
  try {
    const response = await fetch(
      "http://localhost:9090/api/recipe/" + params.id
    );
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
}
