import CustomButton from "../components/Common/Button";
import Modal from "../components/Modal/Modal";
import classes from "./NewPostForm.module.css";
import { Link, Form, redirect } from "react-router-dom";

export default function NewPostForm(props) {
  return (
    <Modal>
      <Form method="post">
        <div className={classes.container}>
          <div className={classes.section}>
            <label className={classes.titleLabel}>Title</label>
            <input
              name="title"
              type="text"
              placeholder="Recipe title..."
              className={classes.titleInput}
            ></input>
          </div>
          <div className={classes.section}>
            <label className={classes.descriptionLabel}>Description</label>
            <textarea
              name="description"
              placeholder="Recipe description..."
              className={classes.descriptionInput}
            ></textarea>
          </div>
          <div className={classes.section}>
            <label className={classes.authorLabel}>Author</label>
            <input
              name="author"
              type="text"
              placeholder="Author's name..."
              className={classes.authorInput}
            ></input>
          </div>
          <div className={classes.flexRow}>
            <Link style={{display: 'flex'}} to="/">
              <button className={classes.cancelButton} type="button">
                Cancel
              </button>
            </Link>
            <div className={classes.flexEnd}>
              <CustomButton onClick={props.onClick} info="Add new" />
            </div>
          </div>
        </div>
      </Form>
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
