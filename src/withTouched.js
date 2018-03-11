import { compose, mapProps } from "recompose";
import withFormik from "./withFormik";

const withError = compose(
  withFormik,
  mapProps(({ formik: { touched }, name, ...props }) => ({
    touched: touched[name],
    ...props,
    name
  }))
);

export default withError;
