import React, { useContext, useEffect } from "react";
import { Stack } from "@mui/material";
import { Formik } from "formik";
import { SubmitButton } from "../";
import { accountContext } from "../../Contexts";

const MyForm = ({
  children,
  initialValues,
  onSubmit,
  validationSchema,
  dontUseDefaltSubmitButton,
}) => {
  const { isLoadingButton, setIsLoadingButton } = useContext(accountContext);

  useEffect(() => {
    return () => {
      setIsLoadingButton(false);
    };
  }, [setIsLoadingButton]);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {() => (
        <>
          {children}
          {!dontUseDefaltSubmitButton && (
            <Stack flex={1} pt={6} justifyContent="flex-end">
              <SubmitButton title="تایید" isLoading={isLoadingButton} />
            </Stack>
          )}
        </>
      )}
    </Formik>
  );
};

export default MyForm;
