import { Button, Typography } from "@mui/material";
import { ArrowDropDown, MyLocation } from "@mui/icons-material";
import { errorMessage } from "../../utils/toast";

const AddressButton = () => {
  return (
    <Button
      onClick={() =>
        errorMessage("برای افزودن آدرس وارد حسابد کاربری خود شوید")
      }
      style={{
        backgroundColor: "#FFE0F4",
        borderRadius: 10,
      }}
      variant="contained"
      endIcon={<ArrowDropDown color="primary" />}
      startIcon={<MyLocation color="primary" />}
    >
      <Typography color="#DC143C">انتخاب آدرس</Typography>
    </Button>
  );
};

export default AddressButton;
