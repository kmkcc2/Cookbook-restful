import Modal from "../components/Modal/Modal";
import CustomButton from "../components/Common/Button";
import classes from "./DeleteRecipe.module.css";
import { Link, redirect, useRouteLoaderData } from "react-router-dom";
import { Form } from "react-router-dom";

export default function DeleteRecipe(props) {
  const recipe = useRouteLoaderData("recipeRoot");

  return (
    <Modal>
      <div className={classes.container}>
        <p>Are you sure you wan't to delete this recipe?</p>
        <div className={classes.flexRow}>
          <Link style={{ display: "flex" }} to="..">
            <button onClick={props.onCancel} className={classes.cancelButton}>
              cancel
            </button>
          </Link>
          <Form method="delete" replace>
            <input name="id" defaultValue={recipe.id} hidden />
            <CustomButton info="Confirm" />
          </Form>
        </div>
      </div>
    </Modal>
  );
}

export async function action({params}) {
    await fetch("http://localhost:9090/api/recipe/"+params.id, {
        method: "DELETE",
        headers: {
        "Content-Type": "application/json",
        },
    });
    return redirect('/');
}
