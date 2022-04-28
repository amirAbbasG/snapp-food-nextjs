const styles = {
    root:(theme) => ({
        width: "100%",
        [theme.breakpoints.down("md")]:{
            display: "none"
        }
    }),
    img: {
        marginLeft: "14px",
        width: "34px",
        height: "34px",
        boxShadow: 2,
    },
    titleBox: {
        borderRadius: "10px",
        backgroundColor:" secondary.dark",
        padding: "1rem !important",
        fontSize: "17px",
        marginBottom: "17px",
        fontWeight: "bold",
    },

    categoryItem: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: "14px",
    },
};

export default styles
