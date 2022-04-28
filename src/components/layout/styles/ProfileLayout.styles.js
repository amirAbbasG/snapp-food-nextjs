const styles = {
    root: theme => ({
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "row",
        justifyContent: "space-between",
        [theme.breakpoints.down("md")]: {
            flexDirection: "column",
            alignItems: "center",
        },
    }),
    paper: {
        borderRadius: "14px",
        width: "100%",
        position: "sticky",
        top: 10,
    },
    paperBox: theme => ({
        [theme.breakpoints.down("md")]: {
            width: "100%",
        },
    }),
    numberBox: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    fullName: {
        fontWeight: "bold",
        lineHeight: "0.5px",
        marginBottom: "7px",
    },
};

export default styles
