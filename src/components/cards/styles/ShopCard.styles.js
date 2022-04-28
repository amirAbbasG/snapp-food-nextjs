const styles = {
    root: {
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        maxWidth: "350px",
        width: "100%",
        '&:hover': {
            boxShadow: 3,
        },
    },
    contentBox: {
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        width: "100%"
    },
    deliveryBox: {
        display: "flex",
        borderRadius: "20px",
        padding: "10px",
        marginTop: "7px",
    },
    logo: {
        position: "absolute",
        boxShadow: 3,
        borderRadius: "10px",
        overflow: "hidden",
        top: "100px"
    },
};

export default styles
