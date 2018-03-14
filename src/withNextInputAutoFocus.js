import React from "react";
import { compose, mapProps } from "recompose";
import PropTypes from "prop-types";
import { isArray } from "lodash";
import withFormik from "./withFormik";

const withNextInputAutoFocusContextType = {
  setInput: PropTypes.func,
  handleSubmitEditing: PropTypes.func,
  getReturnKeyType: PropTypes.func
};

const isInput = component => component && !!component.props.name;

export const withNextInputAutoFocusForm = WrappedComponent => {
  class WithNextInputAutoFocusForm extends React.PureComponent {
    static childContextTypes = withNextInputAutoFocusContextType;
    static contextTypes = { formik: PropTypes.object };

    constructor(props) {
      super(props);
      const { children } = props;
      this.inputs = (isArray(children) ? children : [children]).filter(isInput);
    }

    inputs;
    inputNameMap;
    inputRefs = {};

    getInputPosition = name => this.inputs.findIndex(input => input.props.name === name);

    getChildContext = () => ({
      setInput: (name, component) => {
        this.inputRefs[name] = component;
      },
      handleSubmitEditing: name => {
        const inputPosition = this.getInputPosition(name);
        const isLastInput = inputPosition === this.inputs.length - 1;

        if (isLastInput) {
          const mockedEvent = { preventDefault: () => {} };
          this.context.formik.handleSubmit(mockedEvent);
        } else {
          const nextInput = this.inputs[inputPosition + 1];
          this.inputRefs[nextInput.props.name].focus();
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

  return WithNextInputAutoFocusForm;
};

export const withNextInputAutoFocusInput = Input => {
  class WithNextInputAutoFocusInput extends React.Component<$FlowFixMeProps, $FlowFixMeState> {
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
