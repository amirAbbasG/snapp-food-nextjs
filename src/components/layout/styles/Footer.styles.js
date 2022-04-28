const styles =  {
    root: {
        backgroundColor: "secondary.main",
        padding: "1rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        flex: 1
    },

    socialsMediaBox: {
        direction: "column",
    },

    linkBox: theme => ({
        [theme.breakpoints.down("md")]: {
            marginBottom: "2rem",
            textAlign: "center",
        },
    }),

    logoBox: theme => ({
        [theme.breakpoints.down("md")]: {
            justifyContent: "space-around",
            marginBottom: "2rem",
        },
    }),
};

export default styles
