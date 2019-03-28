import React, { PureComponent } from "react";
import { Subject } from "rxjs";

import withAutoFocusContext from "./withAutoFocusContext";
import withFormik from "./withFormik";

export const focusOnFirstError = new Subject();

function withFocusOnFirstError(WrappedComponent) {
  class withFocusOnFirstError extends PureComponent {
    constructor(props) {
      super(props);

      this.onPress = this.onPress.bind(this);
    }

    componentDidMount() {
      this.subscription = focusOnFirstError.subscribe(() => {
        this.props.autoFocusContext.focusOnFirstError();
      });
    }

    componentWillUnmount() {
      this.subscription.unsubscribe();
    }

    onPress() {
      this.props.formik.handleSubmit();
      setTimeout(() => {
        this.props.autoFocusContext.focusOnFirstError();
      }, 0);
    }

    render() {
      return <WrappedComponent {...this.props} onPress={this.onPress} />;
    }
  }

  return withAutoFocusContext(withFormik(withFocusOnFirstError));
}

export default withFocusOnFirstError;
