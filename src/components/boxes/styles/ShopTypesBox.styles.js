const styles = {
    root: theme => ({
        width: "100%",
        [theme.breakpoints.down("md")]: {
            overflowX: "scroll",
        },
        alignItems: "center",
    }),
    itemBox: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        minWidth: "60px"
    },
    iconButton: {
        "&:hover": {
            animation: "pendulum 0.6s"
        },
        "@keyframes pendulum": {
            "0%": {
                transform: "scale(1.1)",

            },
            "25%": {
                transform: "rotate(-8deg)",

            },
            "50%": {
                transform: "rotate(8deg)",
            },
            "75%": {
                transform: "rotate(-8deg)",
            },
            "100%": {
                transform: "rotate(8deg)",

            }
        }
    },


};

export default styles
