import Link from "next/link";

import {Grid, Typography, Card} from "@mui/material";
import {KeyboardArrowLeft} from "@mui/icons-material";


const CategoryCard = ({category}) => {


    const {root, title, titleGrid} = styles

    return (
        <Link href={`/shops?category=${category}`}>
            <a>

                <Card
                    elevation={2}
                    sx={{
                        ...root, backgroundImage: `url(/images/categories/${category.replace(
                            " ",
                            "-"
                        )}.jpg)`,
                    }}
                >
                    <Grid container spacing={2}
                          sx={titleGrid}

                    >
                        <Typography
                            sx={title}
                        >{category}</Typography>
                        <KeyboardArrowLeft color="primary"/>
                    </Grid>
                </Card>
            </a>
        </Link>
    );
};

export default CategoryCard;

const styles = {
    root: {
        width: "11rem",
        height: "6rem",
        borderRadius: "10px",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "flex-start",
        cursor: "pointer",

    },
    titleGrid: {
        backgroundColor: "#FFFFFF",
        width: "auto",
        borderTopLeftRadius: "10px",
        alignItems: "center",
        paddingRight: "3px",
    },
    title: {
        "&:hover": {
            marginLeft: "4px",
        },
        margin: "3px 8px 3px 0",
    },
}
