import React from "react";
import PropTypes from "prop-types";
import withFormik from "./withFormik";

const withNextInputAutoFocusContextType = {
  setInput: PropTypes.func,
  handleSubmitEditing: PropTypes.func,
  getReturnKeyType: PropTypes.func
};

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
  class WithNextInputAutoFocusForm extends React.PureComponent {
    static childContextTypes = withNextInputAutoFocusContextType;

    constructor(props) {
      super(props);
      const { children } = props;
      this.inputs = getInputs(children || []);
    }

    inputs;
    inputNameMap;
    inputRefs = {};

    getInputPosition = name =>
      this.inputs.findIndex(input => input.props.name === name);

    getChildContext = () => ({
      setInput: (name, component) => {
        this.inputRefs[name] = component;
      },
      handleSubmitEditing: name => {
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
      },
      getReturnKeyType: name => {
        const inputPosition = this.getInputPosition(name);
        const isLastInput = inputPosition === this.inputs.length - 1;

        return isLastInput ? "done" : "next";
      }
    });

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return withFormik(WithNextInputAutoFocusForm);
};

export const withNextInputAutoFocusInput = Input => {
  class WithNextInputAutoFocusInput extends React.Component<
    $FlowFixMeProps,
    $FlowFixMeState
  > {
    static contextTypes = withNextInputAutoFocusContextType;

    setInput = component => {
      this.context.setInput(this.props.name, component);
    };

    onSubmitEditing = () => {
      this.context.handleSubmitEditing(this.props.name);
      if (this.props.onSubmitEditing) this.props.onSubmitEditing();
    };

    render() {
      const { getReturnKeyType } = this.context;
      const { name } = this.props;

      return (
        <Input
          returnKeyType={getReturnKeyType(name)}
          {...this.props}
          ref={this.setInput}
          onSubmitEditing={this.onSubmitEditing}
        />
      );
    }
  }

  return WithNextInputAutoFocusInput;
};
