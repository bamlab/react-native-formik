import React, { PureComponent } from "react";

import AutoFocusContext from "./contexts/AutoFocusContext";
import withFormik from "./withFormik";

const getInputs = children =>
  React.Children.toArray(children).reduce((partialInputs, child) => {
    if (child && child.props && child.props.children) {
      return partialInputs.concat(getInputs(child.props.children));
    }
    if (child && child.props && !!child.props.name)
      return partialInputs.concat(child);
    return partialInputs;
  }, []);

const withNextInputAutoFocusForm = (
  WrappedComponent,
  { submitAfterLastInput } = { submitAfterLastInput: true }
) => {
  class WithNextInputAutoFocusForm extends PureComponent {
    constructor(props) {
      super(props);
      const { children } = props;
      this.inputs = getInputs(children || []);

      this.getReturnKeyType = this.getReturnKeyType.bind(this);
      this.handleSubmitEditing = this.handleSubmitEditing.bind(this);
      this.setInput = this.setInput.bind(this);
      this.focusOnFirstError = this.focusOnFirstError.bind(this);

      this.contextValues = {
        setInput: this.setInput,
        handleSubmitEditing: this.handleSubmitEditing,
        getReturnKeyType: this.getReturnKeyType,
        focusOnFirstError: this.focusOnFirstError
      };
    }

    inputs;
    inputNameMap;
    inputRefs = {};

    getInputPosition(name) {
      return this.inputs.findIndex(input => input.props.name === name);
    }

    setInput(name, component) {
      this.inputRefs[name] = component;
    }

    handleSubmitEditing(name) {
      const inputPosition = this.getInputPosition(name);
      const nextInputs = this.inputs.slice(inputPosition + 1);
      const nextFocusableInput = nextInputs.find(
        element =>
          this.inputRefs[element.props.name] &&
          this.inputRefs[element.props.name].focus
      );

      if (nextFocusableInput) {
        this.inputRefs[nextFocusableInput.props.name].focus();
      } else {
        if (submitAfterLastInput) this.props.formik.submitForm();
      }
    }

    getReturnKeyType(name) {
      const inputPosition = this.getInputPosition(name);
      const isLastInput = inputPosition === this.inputs.length - 1;

      return isLastInput ? "done" : "next";
    }

    focusOnFirstError() {
      const firstInputWithError = this.inputs.find(
        element =>
          this.inputRefs[element.props.name] &&
          this.inputRefs[element.props.name].hasError &&
          this.inputRefs[element.props.name].hasError() &&
          this.inputRefs[element.props.name].focus
      );

      if (firstInputWithError) {
        this.inputRefs[firstInputWithError.props.name].focus();
      }
    }

    render() {
      return (
        <AutoFocusContext.Provider value={this.contextValues}>
          <WrappedComponent {...this.props} />
        </AutoFocusContext.Provider>
      );
    }
  }

  return withFormik(WithNextInputAutoFocusForm);
};

export default withNextInputAutoFocusForm;
