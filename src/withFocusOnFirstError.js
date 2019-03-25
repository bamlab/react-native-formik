import React, { PureComponent } from "react";

import AutoFocusContext from "./contexts/autoFocusContext";
import withFormik from "./withFormik";

const withFocusOnFirstError = WrappedComponent => {
  class withFocusOnFirstError extends PureComponent {
    constructor(props) {
      super(props);

      this.renderButton = this.renderButton.bind(this);
    }

    renderButton(context) {
      const onPress = () => {
        this.props.formik.handleSubmit();
        setTimeout(() => {
          context.focusOnFirstError();
        }, 0);
      };

      return <WrappedComponent {...this.props} onPress={onPress} />;
    }

    render() {
      return (
        <AutoFocusContext.Consumer>
          {this.renderButton}
        </AutoFocusContext.Consumer>
      );
    }
  }

  return withFormik(withFocusOnFirstError);
};

export default withFocusOnFirstError;
