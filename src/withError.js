import { compose, mapProps } from "recompose";
import withFormik from "./withFormik";

const withError = compose(
  withFormik,
  mapProps(({ formik: { errors }, name, ...props }) => ({
    error: errors[name],
    ...props,
    name
  }))
);

export default withError;
