import Post from "./Post";
import classes from "./PostsList.module.css";
import { useState, useEffect } from "react";
import Modal from "../Modal/Modal";
import ConfirmAlert from "../Common/ConfirmAlert";
import { useLoaderData } from "react-router";

var chosenId = -1;

export default function PostsList() {
  const recipeList = useLoaderData();
  return (
    <>
      <div className={classes.grid}>
        {recipeList !== [] &&
          recipeList.map((recipe) => {
            return (
              <Post
                key={recipe.id}
                id={recipe.id}
                title={recipe.title}
                description={recipe.description}
                author={recipe.author}
              />
            );
          })}
      </div>
      {recipeList.length === 0 && (
        <div style={{ textAlign: "center", color: "white" }}>
          <h2>There are no recipes yet.</h2>
          <p>Start adding some!</p>
        </div>
      )}
    </>
  );
}
