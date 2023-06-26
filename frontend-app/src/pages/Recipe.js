import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
export default function Recipe() {
  const params = useParams();
  let navigate = useNavigate();
  const [recipe, setRecipe] = useState([]);

  let recipe_id = params.id;
  async function fetchDataHandler() {
    const response = await fetch(
      "http://127.0.0.1:9090/api/recipe/" + recipe_id
    );
    const data = await response.json();
    setRecipe(data);
  }
  useEffect(() => {
    fetchDataHandler();
  }, []);
  async function deleteFunction() {
    await fetch("http://127.0.0.1:9090/api/recipe/" + recipe_id, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong...");
        }
        navigate("/");
        return response.json();
      })
      .catch((e) => {
        console.log(e);
      });
  }
  return (
    <div>
      <Link to={"/recipes/edit/" + recipe_id}>
        <button>Edit</button>
      </Link>
      <button onClick={deleteFunction}>Delete</button>
      <p>{recipe.title}</p>
      <p>{recipe.description}</p>
      <h3>Products: </h3>
      <p>{recipe.products}</p>
    </div>
  );
}
