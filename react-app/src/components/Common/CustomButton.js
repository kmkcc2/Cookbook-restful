import classes from "./CustomButton.module.css";

export default function CustomButton(props){
    return <button onClick={props.onClick} className={classes.newPostButton}>
        {props.info}
    </button>
}