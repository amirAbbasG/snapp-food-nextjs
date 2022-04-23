
import { Button, Typography } from "@mui/material";
import { ArrowDropDown, MyLocation } from "@mui/icons-material";

import { errorMessage } from "../../lib/toast";

const AddressButton = () => {
  return (
    <Button
      onClick={() =>
        errorMessage("برای افزودن آدرس وارد حسابد کاربری خود شوید")
      }
      sx={{
        backgroundColor: "#FFE0F4",
        borderRadius: "10px",
      }}
      variant="contained"
      endIcon={<ArrowDropDown color="primary" />}
      startIcon={<MyLocation color="primary" />}
    >
                <Typography fontSize="0.8rem" color="#DC143C">انتخاب آدرس</Typography>

    </Button>
  );
};

export default AddressButton;
