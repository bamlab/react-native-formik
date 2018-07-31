import { compose } from "recompose";
import setFormikInitialValue from "./src/setFormikInitialValue";
import withError from "./src/withError";
import withFocus from "./src/withFocus";
import withFormik from "./src/withFormik";
import withInputTypeProps from "./src/withInputTypeProps";
import withTouched from "./src/withTouched";
import withPickerValues from "./src/withPickerValues";
import KeyboardModal from "./src/withPickerValues/KeyboardModal";
import makeReactNativeField from "./src/makeReactNativeField";
import { withNextInputAutoFocusForm, withNextInputAutoFocusInput } from "./src/withNextInputAutoFocus";

const makeInputsGreatAgain = compose(
  withInputTypeProps,
  setFormikInitialValue,
  withError,
  withTouched,
  makeReactNativeField
);

export default makeInputsGreatAgain;

export {
  makeInputsGreatAgain,
  makeReactNativeField,
  setFormikInitialValue,
  withError,
  withFocus,
  withFormik,
  withInputTypeProps,
  withTouched,
  withNextInputAutoFocusForm,
  withNextInputAutoFocusInput,
  withPickerValues,
  KeyboardModal
};
