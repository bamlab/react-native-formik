import { withProps, compose } from "recompose";
import { withFormik } from "./withFormik";

const withFormikControl = compose(
  withFormik,
  withProps(ownProps => ({
    error: ownProps.formik.submitCount
      ? ownProps.formik.errors[ownProps.name]
      : undefined,
    value: ownProps.formik.values[ownProps.name],
    onChange: value => ownProps.formik.setFieldValue(ownProps.name, value)
  }))
);

export default withFormikControl;
