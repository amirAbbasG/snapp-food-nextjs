const styles = {
    root: {
        cursor: "pointer",
        maxWidth: "370px",
        width: "100%",
        "&:hover": {
            boxShadow: 3,
        },
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "14px",
    },

    img: {
        height: "110px",
        width: "110px",
        padding: "12px",
        boxShadow: 1,
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    actionBox: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        paddingTop: "14px",
    },
    contentBox: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
};

export default styles
