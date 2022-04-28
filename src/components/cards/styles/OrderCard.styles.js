const styles = {
    root: theme => ({
        display: "felx",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottom: "1px #e3e3e4 solid",
        padding: "14px",
        [theme.breakpoints.down("lg")]: {
            flexDirection: "column",
            alignItems: "center",
        },
    }),

    shopImage: {
        borderRadius: "7px",
        marginLeft: "7px",
        boxShadow: 1,
    },
    foodBox: {
        backgroundColor: "secondary.dark",
        borderRadius: "10px",
        padding: "4px",
        overflowX: "scroll !important"

    },
    statusBox: {
        border: "1px solid green",
        borderRadius: "7px",
        padding: "7px"
    },
    badge: theme => ({
        marginLeft: "12px",
        [theme.breakpoints.down("sm")]: {
            marginTop: "1rem"
        }
    }),
    exactAddress: {
        overflow: "hidden",
        textOverflow: "ellipsis",
        width: "20ch",
        whiteSpace: "noWrap"
    }
};

export default styles
