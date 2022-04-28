import {makeStyles} from "@mui/styles";

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

export default useStyles
