import { connect } from "formik";
import React, { useContext, useEffect } from "react";
import { Subject } from "rxjs";

import AutoFocusContext from "./contexts/AutoFocusContext";

const focusOnFirstErrorSubject = new Subject();

const withFocusOnFirstError = WrappedComponent =>
  connect(({ formik: { handleSubmit }, ...props }) => {
    const { focusOnFirstError } = useContext(AutoFocusContext);

    useEffect(() => {
      const sub = focusOnFirstErrorSubject.subscribe(focusOnFirstError);

      return sub.unsubscribe();
    });

    const _onPress = () => {
      handleSubmit();
      setTimeout(focusOnFirstError, 0);
    };

    return <WrappedComponent onPress={_onPress} {...props} />;
  });

export function focusOnFirstError() {
  focusOnFirstErrorSubject.next();
}

export default withFocusOnFirstError;
