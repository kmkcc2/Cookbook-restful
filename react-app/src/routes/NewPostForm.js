import Modal from "../components/Modal/Modal";
import RecipeForm from "../components/Posts/RecipeForm";
import { redirect } from "react-router-dom";

export default function NewPostForm(props) {
  return (
    <Modal>
      <RecipeForm info="Add new"/>
    </Modal>
  );
}

export async function action({request}) {
  const formData = await request.formData();
  const postData = Object.fromEntries(formData);
  await fetch("http://localhost:9090/api/recipe", {
    method: "POST",
    body: JSON.stringify(postData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return redirect('/');
}
