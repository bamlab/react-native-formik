import { compose, mapProps } from "recompose";
import _ from "lodash";

import withFormik from "./withFormik";

const makeReactNativeField = compose(
  withFormik,
  mapProps(
    ({
      formik: { setFieldValue, setFieldTouched, values, isSubmitting },
      name,
      ...props
    }) => ({
      value: _.get(values, name),
      ...props,
      name,
      onChangeText: text => {
        setFieldValue(name, text);
        if (props.onChangeText) props.onChangeText(text);
      },
      onBlur: () => {
        // validate onBlur only while not submitting
        // this prevents validating twice in succession when clicking 'done' on keyboard - first onSubmitEditing, then onBlur
        setFieldTouched(name, true, !isSubmitting);
        if (props.onBlur) props.onBlur();
      }
    })
  )
);

export default makeReactNativeField;
