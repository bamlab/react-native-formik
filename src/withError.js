import { compose, mapProps } from "recompose";
import _ from "lodash";

import withFormik from "./withFormik";

const withError = compose(
  withFormik,
  mapProps(({ formik: { errors }, name, ...props }) => ({
    error: _.get(errors, name),
    ...props,
    name
  }))
);

export default withError;
