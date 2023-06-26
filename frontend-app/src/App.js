import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./pages/Main.js";

const router = createBrowserRouter([
  { path: "/", element: <Main content="recipes"></Main> },

  { path: "/recipes", element: <Main content="recipes"></Main> },
  { path: "/recipes/:id", element: <Main content="recipe"></Main> },
  { path: "/recipes/new", element: <Main content="recipeNew"></Main> },
  { path: "/recipes/edit/:id", element: <Main content="recipeEdit"></Main> },

  { path: "/products", element: <Main content="products"></Main> },
  { path: "/product/:id", element: <Main content="product"></Main> },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
