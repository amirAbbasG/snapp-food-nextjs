import { useContext } from "react";

import { MyDialog } from "../";
import { AuthTextField, MyForm } from "..";
import { changePasswordSchema } from "../../utils/validators";

const ChangePasswordDialog = ({ open, handleClose }) => {
  // const { changeAuthenticatedUserPassword, setIsLoadingButton } =
  //   useContext(accountContext);

  const onClose = () => {
    // setIsLoadingButton(false);
    handleClose();
  };

  return (
    <MyDialog open={open} onClose={onClose} title="تغییر رمز عبور" width="30%">
      <MyForm
        validationSchema={changePasswordSchema}
        initialValues={{
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        }}
        // onSubmit={(passwords) => changeAuthenticatedUserPassword(passwords)}
      >
        <AuthTextField title="پسورد فعلی" name="oldPassword" />

        <AuthTextField title="پسورد جدید" name="newPassword" />

        <AuthTextField title="تایید پیورد جدید" name="confirmPassword" />
      </MyForm>
    </MyDialog>
  );
};

export default ChangePasswordDialog;
