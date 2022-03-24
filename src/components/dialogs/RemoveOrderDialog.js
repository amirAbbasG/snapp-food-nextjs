import { makeStyles } from "@mui/styles";
import { Dialog, DialogContent, Button, DialogTitle } from "@mui/material";

const RemoveOrderDialog = ({ open, onClose, orderId }) => {
  // const dispatch = useDispatch();
  const handleYes = () => {
    // dispatch(removeCart(orderId));
    onClose();
  };

  const { dialog, content, button } = useStyles();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      classes={{
        paper: dialog,
      }}
    >
      <DialogTitle>آیا از حذف سبد خرید مطمئن هستید ؟</DialogTitle>
      <DialogContent className={content}>
        <Button
          className={button}
          variant="contained"
          color="secondary"
          onClick={onClose}
        >
          انصراف
        </Button>
        <Button
          className={button}
          variant="contained"
          color="primary"
          onClick={handleYes}
        >
          حذف سبد
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default RemoveOrderDialog;

const useStyles = makeStyles({
  dialog: {
    borderRadius: 14,
    width: "30%",
  },
  button: {
    width: "44%",
    padding: 14,
    margin: 14,
  },
  content: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
