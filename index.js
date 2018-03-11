import { compose } from "recompose";
import withError from "./src/withError";
import withFocus from "./src/withFocus";
import withFormik from "./src/withFormik";
import withInputTypeProps from "./src/withInputTypeProps";
import withTouched from "./src/withTouched";
import makeReactNativeField from "./src/makeReactNativeField";
import { withNextInputAutoFocusForm, withNextInputAutoFocusInput } from "./src/withNextInputAutoFocus";

const makeInputsGreatAgain = compose(withInputTypeProps, withError, withTouched, makeReactNativeField);

export default makeInputsGreatAgain;

export {
  makeInputsGreatAgain,
  makeReactNativeField,
  withError,
  withFocus,
  withFormik,
  withInputTypeProps,
  withTouched,
  withNextInputAutoFocusForm,
  withNextInputAutoFocusInput
};
