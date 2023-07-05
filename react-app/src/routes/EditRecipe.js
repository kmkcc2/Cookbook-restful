import { redirect } from "react-router";
import Modal from "../components/Modal/Modal";
import RecipeForm from "../components/Posts/RecipeForm";
import { useRouteLoaderData } from "react-router";

export default function EditRecipe() {
  const recipe = useRouteLoaderData("recipeRoot");

  return (
    <Modal>
      <RecipeForm
        info="Save edited"
        title={recipe.title}
        description={recipe.description}
        author={recipe.author}
      />
    </Modal>
  );
}

export async function action({request, params}) {
    const formData = await request.formData();
    const postData = Object.fromEntries(formData);
    await fetch("http://localhost:9090/api/recipe/"+params.id, {
      method: "PUT",
      body: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return redirect('..');
}
