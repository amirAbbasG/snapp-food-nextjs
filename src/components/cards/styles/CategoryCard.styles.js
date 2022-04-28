const styles = {
    root: (category) => (theme) => ({
        width: "11rem",
        height: "6rem",
        borderRadius: "10px",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "flex-start",
        cursor: "pointer",
        [theme.breakpoints.down("sm")]: {
            width: "13rem",
            height: "7rem"
        },
        backgroundImage: `url(/images/categories/${category.replace(
            " ",
            "-"
        )}.jpg)`
    }),
    titleGrid: {
        backgroundColor: "#FFFFFF",
        width: "57%",
        borderTopLeftRadius: "10px",
        alignItems: "center",
        paddingRight: "3px",
        transition: "width 0.40s",

        justifyContent: "space-between",
        "&:hover": {
            width: "100%",
            borderTopLeftRadius: 0,
        },
    },
    title: {
        margin: "3px 8px 3px 0",
    },
}

export default styles
