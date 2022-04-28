
const styles = {

    textField: {
        backgroundColor: "#FFFFFF",
        borderRadius: "7px",
    },
    helpText: (theme) => ({
        backgroundColor: "#FFFFFF",
        borderRadius: "7px",
        padding: "1.2rem",
        borderBlockColor: "#FFFFFF",
        width: "27rem",
        color: "#000",
        fontWeight: "bold",
        [theme.breakpoints.down("sm")]:{
            width: "18rem"
        }
    }),
    shopsBox: (theme) => ({
        width: "27rem",
        backgroundColor: "#FFFFFF",
        borderRadius: "7px",
        padding: "10px",
        [theme.breakpoints.down("sm")]:{
            width: "18rem"
        }
    }),
};

export default styles


