import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  IconButton,
  Stack,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";

const MyDialog = ({ open, onClose, title, children, ...props }) => {

  const { dialog } = useStyles(props);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      classes={{
        paper: dialog,
      }}
    >
      <DialogTitle>
        <Stack sx={ {
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
          <Typography>{title}</Typography>
        </Stack>
      </DialogTitle>

      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default MyDialog;

const useStyles = makeStyles({
  dialog: {
    width: (props) => props.width,
    borderRadius: 14,
    maxWidth: "740px",
  },
});
