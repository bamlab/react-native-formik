import React, { PureComponent } from "react";

import AutoFocusContext from "../contexts/autoFocusContext";
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

export const withNextInputAutoFocusForm = (
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

      this.contextValues = {
        setInput: this.setInput,
        handleSubmitEditing: this.handleSubmitEditing,
        getReturnKeyType: this.getReturnKeyType
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

export const withNextInputAutoFocusInput = WrappedInput => {
  class WithNextInputAutoFocusInput extends PureComponent<$FlowFixMeProps, $FlowFixMeState> {
    constructor(props) {
      super(props);

      this.renderInput = this.renderInput.bind(this);
    }

    renderInput(context) {
      const { getReturnKeyType } = context;
      const { name } = this.props;

      const setInput = component => {
        context.setInput(name, component);
      };

      const onSubmitEditing = () => {
        context.handleSubmitEditing(name);
        if (this.props.onSubmitEditing) this.props.onSubmitEditing();
      };

      return (
        <WrappedInput
          returnKeyType={getReturnKeyType(name)}
          {...this.props}
          onSubmitEditing={onSubmitEditing}
          ref={setInput}
        />
      );
    }

    render() {
      return (
        <AutoFocusContext.Consumer>
          {this.renderInput}
        </AutoFocusContext.Consumer>
      );
    }
  }

  return WithNextInputAutoFocusInput;
};
