import React from "react";
import { compose } from "recompose";
import { has } from "lodash";
import withFormik from "./withFormik";

const setFormikInitialValue = WrappedInput => {
  return class WithFocusProp extends React.PureComponent {
    constructor(props) {
      super(props);

      const { formik, name } = props;
      if (!has(formik.values, name)) {
        formik.setFieldValue(name, "");
      }
    }

    render() {
      return <WrappedInput {...this.props} />;
    }
  };
};

export default compose(
  withFormik,
  setFormikInitialValue
);
