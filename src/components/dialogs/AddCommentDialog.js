import {useState} from "react";

import {Stack, TextField, Button, Rating, Typography} from "@mui/material";

import {MyDialog} from "../";
import {addCommentApi} from "../../services/commentServices"
import {successMessage, errorMessage} from "../../utils/toast";

const AddCommentDialog = ({open, handleClose, id, handleSetNewComment}) => {
    const [commentText, setCommentText] = useState("");
    const [score, setScore] = useState(0);


    const handleRating = (rate) => {
        if (score === 1 && rate === 1) {
            setScore(0);
        } else {
            setScore(rate);
        }
    };

    const handleAddComment = async () => {
        try {
            const commentBody = {
                text: commentText,
                score,
                id
            };
            const {status, data: {comment}} = await addCommentApi(commentBody);
            if (status === 201) {
                successMessage("نظر شما ثبت شد");
                setCommentText("");
                setScore(0);
                handleClose();
                handleSetNewComment(comment)
            }
        } catch (error) {
            errorMessage(error.response.data.message);
        }


    };

    return (
        <MyDialog width="30%" title="افزودن نظر" open={open} onClose={handleClose}>
            <TextField
                fullWidth
                placeholder="نظر خود را بنویسید ..."
                onChange={(e) => setCommentText(e.target.value)}
            />
            <Stack
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    my: 4,
                }}
            >
                <Typography color="textSecondary">امتیاز دهید</Typography>
                <Rating
                    sx={{mt: 1, alignSelf: "center"}}
                    size="large"
                    value={score}
                    onChange={(event, newValue) => {
                        handleRating(newValue);
                    }}
                />
            </Stack>
            <Button
                sx={{width: "100%"}}
                variant="contained"
                onClick={handleAddComment}
            >
                ثبت نظر
            </Button>
        </MyDialog>
    );
};

export default AddCommentDialog;
