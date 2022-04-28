const styles = {
    root: {
        padding: "0 1rem 1rem 1rem",
        width: "100%",
        position: "sticky",
        zIndex: 999,
        top: "0px",
        right: "0px",
        left: "0px"
    },
    logo: theme => ({
        [theme.breakpoints.down("sm")]: {
            display: "none",
        },
    }),
    SearchBox: theme => ({
        backgroundColor: "secondary.dark",
        borderRadius: "8px",
        alignItems: "center",
        display: "flex",
        maxWidth: "40px",
        width: "27%",
        padding: "10px",
        [theme.breakpoints.down("md")]: {
            display: "none",
        },
    }),
    searchText: theme => ({
        display: "inline",
        color: "#808080",
        fontSize: "15px",
        marginRight: "8px",
        [theme.breakpoints.down("lg")]: {
            fontSize: "13px"
        }
    }),
    buttonBox: theme => ({
        display: "flex",
        justifyContent: "flex-end",
        [theme.breakpoints.down("md")]: {
            display: "none",
        },
    }),
    addressBox: {
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start"
    },
    iconsBox:(isLogin) => theme => ({
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        [theme.breakpoints.up("md")]: {
            display: !isLogin && "none",
        },

    }),
    orderBox: {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
    },
    addressButton: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    addressTitle: theme => ({
        [theme.breakpoints.down("sm")]: {
            fontSize: "11px"
        },
    }),
    exactAddress: {
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        width: "20ch"
    }
};

export default styles
