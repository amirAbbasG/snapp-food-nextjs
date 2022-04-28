import {Grid, Typography, Card} from "@mui/material";
import {KeyboardArrowLeft} from "@mui/icons-material";

import {Link} from "../";
import styles from "./styles/CategoryCard.styles"


const CategoryCard = ({category}) => {


    const {root, title, titleGrid} = styles

    return (
        <Link href={`/shops?filter=category&category=${category}`}>
            <Card
                elevation={2}
                sx={
                    root(category)
                }
                component="article"
            >
                <Grid container spacing={2}
                      sx={titleGrid}

                >
                    <Typography
                        sx={title}
                        component="h6"
                    >{category}</Typography>
                    <KeyboardArrowLeft color="primary"/>
                </Grid>
            </Card>
        </Link>
    );
};

export default CategoryCard;


