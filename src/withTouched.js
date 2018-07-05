import { compose, mapProps } from "recompose";
import withFormik from "./withFormik";
import { selectValue } from './utils';

const withError = compose(
  withFormik,
  mapProps(({ formik: { touched }, name, ...props }) => ({
    touched: selectValue(touched, name),
    ...props,
    name
  }))
);

export default withError;
