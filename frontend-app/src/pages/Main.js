import Recipes from "./Recipes";
import Recipe from "./Recipe";
import NewRecipeForm from "../components/Recipe/Forms/NewRecipeForm";
import EditRecipeForm from "../components/Recipe/Forms/EditRecipeForm";
import Header from "../components/Header";
import "./Container.css";
export default function Main(props) {
  let cont = props.content;
  return (
    <div className="Main">
      <Header />
      <div className="Container">
        {cont === "recipes" && <Recipes />}
        {cont === "recipeNew" && <NewRecipeForm />}
        {cont === "recipeEdit" && <EditRecipeForm />}
        {cont === "recipe" && <Recipe />}
      </div>
    </div>
  );
}
