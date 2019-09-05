import { compose } from "recompose";
import handleTextInput from "./src/handleTextInput";
import setFormikInitialValue from "./src/setFormikInitialValue";
import withError from "./src/withError";
import withErrorIfNeeded from "./src/withErrorIfNeeded";
import withFocus from "./src/withFocus";
import withFocusOnFirstError, {
  focusOnFirstError
} from "./src/withFocusOnFirstError";
import withFormik from "./src/withFormik";
import withFormikControl from "./src/withFormikControl";
import withInputTypeProps from "./src/withInputTypeProps";
import withTouched from "./src/withTouched";
import withPickerValues from "./src/withPickerValues";
import KeyboardModal from "./src/withPickerValues/KeyboardModal";
import makeReactNativeField from "./src/makeReactNativeField";
import AutoFocusContext from "./src/contexts/AutoFocusContext";
import withNextInputAutoFocusForm from "./src/withNextInputAutoFocusForm";
import withNextInputAutoFocusInput from "./src/withNextInputAutoFocusInput";

const makeInputsGreatAgain = compose(
  withInputTypeProps,
  setFormikInitialValue,
  withError,
  withTouched,
  makeReactNativeField
);

export default makeInputsGreatAgain;

export {
  handleTextInput,
  makeInputsGreatAgain,
  makeReactNativeField,
  setFormikInitialValue,
  withError,
  withErrorIfNeeded,
  withFocus,
  withFormik,
  withFormikControl,
  withInputTypeProps,
  withTouched,
  withNextInputAutoFocusForm,
  withNextInputAutoFocusInput,
  withPickerValues,
  KeyboardModal,
  AutoFocusContext,
  withFocusOnFirstError,
  focusOnFirstError
};
