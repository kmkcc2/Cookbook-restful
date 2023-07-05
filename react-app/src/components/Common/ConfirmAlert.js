import classes from "./ConfirmAlert.module.css";
import CustomButton from "./Button";
export default function ConfirmAlert(props) {
  return (
    <div className={classes.container}>
      <p>Are you sure you wan't to delete this recipe?</p>
      <div className={classes.flexRow}>
        <button onClick={props.onCancel} className={classes.cancelButton}>cancel</button>
        <CustomButton onClick={props.onConfirm} info="Confirm" />
      </div>
    </div>
  );
}
