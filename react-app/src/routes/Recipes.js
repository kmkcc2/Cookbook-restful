import "./Recipes.css";
import PostsList from "../components/Posts/PostsList";
import { Outlet } from "react-router";
function Recipes() {
  return (
    <>
      <Outlet />
      <main>
        <PostsList />
      </main>
    </>
  );
}

export default Recipes;

export async function loader(){
  try{
    const response = await fetch("http://localhost:9090/api/recipe");
    const data = await response.json();
    return data.reverse();
  }catch(e){
    alert('Server connection error')
    return [];
  }

}
