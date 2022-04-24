export const styles = {
    profileRoot: {
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "column",
        padding: "17px",
    },
    profileDetailBox: {
        display: "grid",
        gridTemplateColumns: "repeat(2,1fr)",
        width: "100%",
        padding: "3rem 1rem",
    },
    profileAction: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: "0.4rem 1rem",
        cursor: "pointer",
        transition: "margin 0.25s ease-in-out",
        "&:hover": {
            marginRight: "0.5rem",
        },
    },

    detailText: (theme) => ({
        [theme.breakpoints.down("sm")]: {
            fontSize: "12px"
        }
    }),

};
