import {makeStyles} from "@mui/styles";
import {styled} from "@mui/system"
import {Dialog, DialogContent, Button, DialogTitle} from "@mui/material";
import {useDispatch} from "react-redux";

import {removeCart} from "../../recux/actions/orders";

const RemoveOrderDialog = ({open, onClose, orderId}) => {
    const dispatch = useDispatch();

    const handleYes = () => {
        dispatch(removeCart(orderId));
        onClose();
    };

    const MyButton = styled(Button)(({theme}) => ({
        width: "44%",
        padding: "14px",
        margin: "14px",
        [theme.breakpoints.down("sm")]: {
            width: "55%",
            margin: "10px",
        },
    }))

    const {dialog} = useStyles();

    return (
        <Dialog
            open={open}
            onClose={onClose}
            classes={{
                paper: dialog,
            }}
        >
            <DialogTitle>آیا از حذف سبد خرید مطمئن هستید ؟</DialogTitle>
            <DialogContent sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
            }}>
                <MyButton
                    variant="contained"
                    color="secondary"
                    onClick={onClose}
                >
                    انصراف
                </MyButton>
                <MyButton
                    variant="contained"
                    color="primary"
                    onClick={handleYes}
                >
                    حذف سبد
                </MyButton>
            </DialogContent>
        </Dialog>
    );
};

export default RemoveOrderDialog;

const useStyles = makeStyles(theme => ({
    dialog: {
        borderRadius: 14,
        width: "30%",
        [theme.breakpoints.down("xl")]: {
            width: "50%"
        },
        [theme.breakpoints.down("md")]: {
            width: "70%"
        } ,
        [theme.breakpoints.down("sm")]: {
            width: "90%"
        }
    }
}));
