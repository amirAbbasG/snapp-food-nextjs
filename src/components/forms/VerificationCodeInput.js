import ReactCodeInput from "react-code-input";
import { Typography } from "@mui/material";
import { useFormikContext } from "formik";

const VerificationCodeInput = () => {
  const { touched, errors, setFieldTouched, handleChange } = useFormikContext();

  return (
    <>
      <ReactCodeInput
        type="text"
        style={{
          justifyContent: "center",
          width: "100%",
          direction: "ltr",
          textAlign: "center",
          marginTop: 20,
          marginBottom: 8,
        }}
        touch={() => setFieldTouched("codes")}
        fields={5}
        onChange={handleChange("code")}
        autoFocuss
      />
      {touched["code"] && errors["code"] ? (
        <Typography textAlign="center" mt="20" ml="12" color="error">
          {errors["code"]}
        </Typography>
      ) : null}
    </>
  );
};

export default VerificationCodeInput;
