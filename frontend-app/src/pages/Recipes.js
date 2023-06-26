import { useState, useEffect } from "react";
import RecipeList from "../components/Recipe/RecipeList";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
export default function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [unchangeRecipes, setUnchangeRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  searchParams.get("sort");
  let sortParams = searchParams.get("sort");
  let navigate = useNavigate();
  async function fetchDataHandler() {
    setIsLoading(true);
    const response = await fetch("http://127.0.0.1:9090/api/recipe");
    const data = await response.json();
    setUnchangeRecipes(data);

    let sortedData = data;
    if (sortParams === "asc") {
      sortedData = data.sort((a, b) => {
        return a.title.localeCompare(b.title);
      });
    } else if (sortParams === "desc") {
      sortedData = data.sort((a, b) => {
        return b.title.localeCompare(a.title);
      });
    }
    setRecipes(sortedData);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchDataHandler();
  }, []);

  function sort() {
    if (sortParams === "asc") navigate("/recipes?sort=desc");
    else navigate("/recipes?sort=asc");

    window.location.reload();
  }

  function dataFilter() {
    let search = document.getElementById("search-bar").value;
    let data = unchangeRecipes;
    data = data.filter((recipe) => {
      if (recipe.title.toLowerCase().includes(search.toLowerCase()))
        return recipe;
    });
    setRecipes(data);
    if (search === "") {
      setRecipes(unchangeRecipes);
    }
  }
  return (
    <div>
      <div className="flex-column">
        <Link to="/recipes/new">
          <button>Add new recipe</button>
        </Link>
        <button onClick={sort}>Sort by alphabet</button>
        <input
          id="search-bar"
          type="text"
          placeholder="Search for recipe"
          onChange={dataFilter}
        ></input>
      </div>

      <p>Recipies: </p>
      {recipes.map((recipe) => {
        return (
          <div>
            {isLoading && <p>Loading...</p>}
            {!isLoading && (
              <RecipeList
                title={recipe.title}
                description={recipe.description}
                id={recipe.id}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
