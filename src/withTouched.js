import { compose, mapProps } from "recompose";
import _ from "lodash";

import withFormik from "./withFormik";

const withError = compose(
  withFormik,
  mapProps(({ formik: { touched }, name, ...props }) => ({
    touched: _.get(touched, name),
    ...props,
    name
  }))
);

export default withError;
