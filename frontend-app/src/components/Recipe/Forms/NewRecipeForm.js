import { useNavigate } from "react-router-dom";
import "./Form.css";
export default function NewRecipeForm() {
  let navigate = useNavigate();
  function addRecipe() {
    let title = document.getElementById("title").value;
    let desc = document.getElementById("desc").value;
    let prod = document.getElementById("prod").value;

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: title, description: desc, products: prod }),
    };
    fetch("http://127.0.0.1:9090/api/recipe", requestOptions).then(
      (response) => {
        if (!response.ok) {
          throw new Error("Something went wrong...");
        }
        navigate("/");
      }
    );
  }

  return (
    <div className="form">
      <label>Title: </label>
      <input id="title" type="text"></input>
      <label>Description: </label>
      <input id="desc" type="text"></input>
      <label>Products: </label>
      <input id="prod" type="text"></input>
      <button onClick={addRecipe}>Submit</button>
    </div>
  );
}
