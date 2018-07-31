import React from "react";
import { FormikProvider } from "formik";

const withFormikMock = formikContextValue => Component => props => (
  <FormikProvider value={formikContextValue}>
    <Component {...props} />
  </FormikProvider>
);

export default withFormikMock;
