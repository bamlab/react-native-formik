import { mapProps, compose } from "recompose";
import { connect } from "formik";
import { get } from "lodash";
import withErrorIfNeeded from "./withErrorIfNeeded";

const withFormikControl = compose(
  withErrorIfNeeded,
  connect,
  mapProps(
    ({
      formik: { values, setFieldValue, setFieldTouched },
      name,
      ...props
    }) => ({
      value: get(values, name),
      setFieldValue: (value, ...args) => setFieldValue(name, value, ...args),
      setFieldTouched: (value, ...args) =>
        setFieldTouched(name, value, ...args),
      name,
      ...props
    })
  )
);

export default withFormikControl;
