import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Form.css";
export default function EditRecipeForm() {
  const params = useParams();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [prod, setProd] = useState("");
  let navigate = useNavigate();
  let recipe_id = params.id;
  let recipe = null;
  useEffect(() => {
    fetchDataHandler();
  }, []);

  async function fetchDataHandler() {
    const response = await fetch(
      "http://127.0.0.1:9090/api/recipe/" + recipe_id
    );
    const data = await response.json();
    recipe = data;
    setTitle(data.title);
    setDesc(data.description);
    setProd(data.products);
  }

  function updateRecipe() {
    let title = document.getElementById("title").value;
    let desc = document.getElementById("desc").value;
    let prod = document.getElementById("prod").value;
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: title, description: desc, products: prod }),
    };
    fetch("http://127.0.0.1:9090/api/recipe/" + recipe_id, requestOptions).then(
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
      <input
        id="title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      ></input>
      <label>Description: </label>
      <input
        id="desc"
        type="text"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      ></input>
      <label>Products: </label>
      <input
        id="prod"
        type="text"
        value={prod}
        onChange={(e) => setProd(e.target.value)}
      ></input>
      <button onClick={updateRecipe}>Save</button>
    </div>
  );
}
