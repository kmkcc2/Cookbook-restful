import classes from "./Modal.module.css";
import { useNavigate } from "react-router-dom";

export default function Modal(props){
    const navigate = useNavigate();
    function closeHandler(){
        navigate('..');
    }
    return(<>
        <div className={classes.backdrop} onClick={closeHandler}/>
        <dialog open className={classes.modal}>
            {props.children}
        </dialog>
    </>)
}