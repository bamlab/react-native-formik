import { compose, mapProps } from "recompose";
import withFormik from "./withFormik";

const makeReactNativeField = compose(
  withFormik,
  mapProps(({ formik: { setFieldValue, setFieldTouched, values }, name, ...props }) => ({
    value: values[name],
    ...props,
    name,
    onChangeText: text => {
      setFieldValue(name, text);
      if (props.onChangeText) props.onChangeText(text);
    },
    onBlur: () => {
      setFieldTouched(name);
      if (props.onBlur) props.onBlur();
    }
  }))
);

export default makeReactNativeField;
