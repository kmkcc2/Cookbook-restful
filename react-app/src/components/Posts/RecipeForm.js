import classes from "./RecipeForm.module.css";
import CustomButton from "../Common/CustomButton";
import { Link, Form } from "react-router-dom";
import { useState } from "react";

export default function RecipeForm(props) {
    const [title, setTitle] = useState(props.title);
    const [description, setDescription] = useState(props.description);
    const [author, setAuthor] = useState(props.author);

  return (
    <Form method="post">
      <div className={classes.container}>
        <div className={classes.section}>
          <label className={classes.titleLabel}>Title</label>
          <input
            name="title"
            type="text"
            placeholder="Recipe title..."
            className={classes.titleInput}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
        </div>
        <div className={classes.section}>
          <label className={classes.descriptionLabel}>Description</label>
          <textarea
            name="description"
            placeholder="Recipe description..."
            className={classes.descriptionInput}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className={classes.section}>
          <label className={classes.authorLabel}>Author</label>
          <input
            name="author"
            type="text"
            placeholder="Author's name..."
            className={classes.authorInput}
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          ></input>
        </div>
        <div className={classes.flexRow}>
          <Link style={{ display: "flex" }} to="/">
            <button className={classes.cancelButton} type="button">
              Cancel
            </button>
          </Link>
          <div className={classes.flexEnd}>
            <CustomButton onClick={props.onClick} info={props.info} />
          </div>
        </div>
      </div>
    </Form>
  );
}
