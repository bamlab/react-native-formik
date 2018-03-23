import React from "react";
import { compose, mapProps } from "recompose";
import withFormik from "./withFormik";

const setFormikInitialValue = WrappedInput => {
  return class WithFocusProp extends React.PureComponent {
    constructor(props) {
      super(props);
      props.formik.setFieldValue(props.name, "");
    }

    render() {
      return <WrappedInput {...this.props} />;
    }
  };
};

export default compose(withFormik, setFormikInitialValue);
