import { compose, mapProps } from "recompose";
import { connect } from "formik";
import withError from "./withError";
import withTouched from "./withTouched";

const withErrorIfNeeded = compose(
  withError,
  withTouched,
  connect,
  mapProps(({ formik: { submitCount }, error, touched, ...props }) => {
    const shouldDisplayError = touched || submitCount > 0;

    return {
      touched,
      error: shouldDisplayError ? error : undefined,
      ...props
    };
  })
);

export default withErrorIfNeeded;
