import { MyDialog } from "../";
import { AuthTextField, MyForm } from "..";

const EditProfileDialog = ({ open, handleClose }) => {
  // const account = useSelector((state) => state.account);
  // const { editProfile, setIsLoadingButton } = useContext(accountContext);

  const account = {
    fullName: "",
    number: 1,
    email: "",
  };

  const onClose = () => {
    setIsLoadingButton(false);
    handleClose();
  };

  //#region apply changers
  const handleSummit = (user) => {
    if (user.email === "") {
      // editProfile({
      //   fullName: user.fullName,
      // });
    } else {
      // editProfile(user);
    }
    onClose();
  };
  //#endregion

  return (
    <MyDialog
      onClose={onClose}
      open={open}
      title="ویرایش اطلاعات کاربر"
      width="30%"
    >
      <MyForm
        initialValues={{ email: "", fullName: account.fullName }}
        onSubmit={(user) => handleSummit(user)}
      >
        <AuthTextField
          title="نام نام خانوادگی"
          defaultValue={account.fullName}
          name="fullName"
        />

        <AuthTextField
          title="موبایل"
          value={account.number}
          name="number"
          isReadOnly={true}
        />

        <AuthTextField
          title="ایمیل"
          defaultValue={account.email}
          name="email"
        />
      </MyForm>
    </MyDialog>
  );
};

export default EditProfileDialog;
