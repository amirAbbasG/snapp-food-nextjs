import React from "react";
import { useFormikContext } from "formik";
import { Button, CircularProgress } from "@mui/material";

const SubmitButton = ({ title, isLoading }) => {
  const { handleSubmit, isValid } = useFormikContext();
  return (
    <Button
      fullWidth
      style={{ height: "3rem" }}
      variant="contained"
      onClick={handleSubmit}
      disabled={!isValid}
    >
      {isLoading ? <CircularProgress /> : title}
    </Button>
  );
};

export default SubmitButton;
