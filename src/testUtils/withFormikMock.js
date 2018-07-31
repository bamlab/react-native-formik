import React from "react";
import { FormikProvider } from "formik";

export default formikContextValue => Component => props => (
  <FormikProvider value={formikContextValue}>
    <Component {...props} />
  </FormikProvider>
);
