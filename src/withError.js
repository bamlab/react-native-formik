import { compose, mapProps } from "recompose";
import withFormik from "./withFormik";
import { selectValue } from './utils';

const withError = compose(
  withFormik,
  mapProps(({ formik: { errors }, name, ...props }) => ({
    error: selectValue(errors, name),
    ...props,
    name
  }))
);

export default withError;
