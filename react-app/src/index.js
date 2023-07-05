import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Recipes, { loader as recipeLoader } from "./routes/Recipes";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import NewPostForm, { action as newRecipeAction } from "./routes/NewPostForm";
import RootLayout from "./routes/RootLayout";
import RecipeDetails, {
  loader as getRecipeLoader,
} from "./routes/RecipeDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Recipes />,
        loader: recipeLoader,
        children: [
          {
            path: "/create-recipe",
            element: <NewPostForm />,
            action: newRecipeAction,
          },
        ],
      },
      {
        path: "/recipe/:id",
        element: <RecipeDetails />,
        loader: getRecipeLoader,
      },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
