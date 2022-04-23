import { useFormikContext } from "formik";
import { TextField, Typography, Stack } from "@mui/material";

const AuthTextField = ({
  name,
  title,
  changeNumber,
  isDisabled = false,
  isReadOnly = false,
  ...otherProps
}) => {
  const { errors, setFieldValue, touched, setFieldTouched } =
    useFormikContext();

  const handleChange = (e) => {
    setFieldValue(name, e.target.value);
    if (changeNumber) {
      changeNumber(e.target.value);
    }
  };

  return (
    <Stack style={{ display: isDisabled && "none", marginTop: 10 }}>
      <Typography my={1} component="h4">
        {title}
      </Typography>
      <TextField
        disabled={isDisabled}
        {...otherProps}
        variant="outlined"
        fullWidth
        InputProps={{
          readOnly: isReadOnly,
        }}
        onChange={handleChange}
        onFocus={() => setFieldTouched(name)}
      />
      {touched[name] && errors[name] ? (
        <Typography mt={1} color="error">
          {errors[name]}
        </Typography>
      ) : null}
    </Stack>
  );
};

export default AuthTextField;
