const styles = {
    img: theme => ({
        width: "17rem",
        height: "17rem",
        borderRadius: "10px",
        boxShadow: 2,
        overflow: "hidden",
        margin: "auto",
        [theme.breakpoints.down("sm")]: {
            width: "10rem",
            height: "10rem",
        }
    }),
    detailBox: {
        display: "flex",
        flexDirection: "column",
        padding: "10px",
    },
};

export default styles
