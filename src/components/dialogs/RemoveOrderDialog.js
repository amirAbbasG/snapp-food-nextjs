
import {styled} from "@mui/system"
import {Dialog, DialogContent, Button, DialogTitle} from "@mui/material";
import {useDispatch} from "react-redux";

import {removeCart} from "../../recux/actions/orders";
import useStyles from "./styles/RemoveOrderDialog.styles"

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

