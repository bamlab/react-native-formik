import { compose, withProps } from "recompose";
import { connect } from "formik";
import withInputTypeProps from "./withInputTypeProps";
import withFormikControl from "./withFormikControl";

const handleTextInput = compose(
  withFormikControl,
  withInputTypeProps,
  connect,
  withProps(
    ({
      formik: { isSubmitting },
      setFieldValue,
      setFieldTouched,
      onChangeText,
      onBlur
    }) => ({
      onChangeText: text => {
        setFieldValue(text);
        if (onChangeText) onChangeText(text);
      },
      onBlur: () => {
        // validate onBlur only while not submitting
        // this prevents validating twice in succession when clicking 'done' on keyboard - first onSubmitEditing, then onBlur
        setFieldTouched(true, !isSubmitting);
        if (onBlur) onBlur();
      }
    })
  )
);

export default handleTextInput;
