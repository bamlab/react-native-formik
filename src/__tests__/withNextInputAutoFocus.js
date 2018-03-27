import React from "react";
import PropTypes from "prop-types";
import { compose, withContext } from "recompose";
import { Button, View } from "react-native";
import { mount } from "enzyme";

import { withNextInputAutoFocusForm, withNextInputAutoFocusInput } from "../..";

const submitForm = jest.fn();
const withFormikMock = withContext({ formik: PropTypes.object }, () => ({
  formik: {
    submitForm
  }
}));

const Form = compose(withFormikMock, withNextInputAutoFocusForm)(View);

const focusInput = jest.fn();
class TextInput extends React.PureComponent {
  focus() {
    focusInput(this.props.name);
  }

  render() {
    return null;
  }
}

const Input = withNextInputAutoFocusInput(TextInput);

console.error = jest.fn();

describe("withNextInputAutoFocus", () => {
  it("focuses next input and then submits", () => {
    const wrapper = mount(
      <Form>
        <Input name="first" />
        <Input name="second" />
        <Input name="last" />
        <Button onPress={jest.fn()} title="SUBMIT" />
      </Form>
    );

    const firstInput = wrapper.find(TextInput).first();
    const secondInput = wrapper.find(TextInput).at(1);
    const lastInput = wrapper.find(TextInput).at(2);

    expect(firstInput.props().returnKeyType).toEqual("next");
    expect(secondInput.props().returnKeyType).toEqual("next");
    expect(lastInput.props().returnKeyType).toEqual("done");

    firstInput.props().onSubmitEditing();
    expect(focusInput).toHaveBeenCalledWith("second");
    secondInput.props().onSubmitEditing();
    expect(focusInput).toHaveBeenCalledWith("last");
    lastInput.props().onSubmitEditing();
    expect(focusInput).not.toHaveBeenCalledTimes(3);
    expect(submitForm).toHaveBeenCalled();
  });

  it("does not erase passed input props", () => {
    const onSubmitEditing = jest.fn();
    const wrapper = mount(
      <Form>
        <Input name="first" returnKeyType="correct value" onSubmitEditing={onSubmitEditing} />
      </Form>
    );

    const input = wrapper.find(TextInput).first();

    expect(input.props().returnKeyType).toEqual("correct value");
    input.props().onSubmitEditing();
    expect(submitForm).toHaveBeenCalled();
    expect(onSubmitEditing).toHaveBeenCalled();
  });
});
