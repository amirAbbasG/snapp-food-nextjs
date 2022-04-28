const styles = {
    root: {
        display: "felx",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottom: "1px #e3e3e4 solid",
        padding: "10px",
    },

    shopLogo: {
        width: "3rem",
        height: "3rem",
        borderRadius: "7px",
        marginLeft: "7px",
        overflow: "hidden",
        boxShadow: 1,
    },
    button: (theme) => ({
        width: "50%",
        [theme.breakpoints.down("sm")]: {
            width: "auto",
            px: "2px"
        }
    })
};

export default styles
