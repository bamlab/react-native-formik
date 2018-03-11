import React from "react";
import PropTypes from "prop-types";
import { compose, withContext } from "recompose";
import { TextInput } from "react-native";
import { mount } from "enzyme";

import { makeReactNativeField } from "../..";

console.error = jest.fn();

const setFieldValue = jest.fn();
const setFieldTouched = jest.fn();

const withFormikMock = withContext({ formik: PropTypes.object }, () => ({
  formik: {
    setFieldValue,
    setFieldTouched,
    values: { email: "contact@bam.tech" }
  }
}));
const Input = compose(withFormikMock, makeReactNativeField)(TextInput);

describe("makeReactNativeField", () => {
  it("sets the input value", () => {
    const emailInput = mount(<Input name="email" />);
    expect(emailInput.find(TextInput).props().value).toEqual("contact@bam.tech");
    const otherInput = mount(<Input name="other" />);
    expect(otherInput.find(TextInput).props().value).toEqual(undefined);
  });

  it("handles input value change", () => {
    const wrapper = mount(<Input name="email" />);
    wrapper
      .find(TextInput)
      .props()
      .onChangeText("New text");
    expect(setFieldValue).toHaveBeenCalledWith("email", "New text");
  });

  it("allows override of onChangeText", () => {
    const onChangeText = jest.fn();
    const wrapper = mount(<Input name="email" onChangeText={onChangeText} />);
    wrapper
      .find(TextInput)
      .props()
      .onChangeText("New text");
    expect(onChangeText).toHaveBeenCalledWith("New text");
    expect(setFieldValue).toHaveBeenCalledWith("email", "New text");
  });

  it("handles input touch event", () => {
    const wrapper = mount(<Input name="email" />);
    wrapper
      .find(TextInput)
      .props()
      .onBlur();
    expect(setFieldTouched).toHaveBeenCalledWith("email");
  });

  it("allows override of onBlur", () => {
    const onBlur = jest.fn();
    const wrapper = mount(<Input name="email" onBlur={onBlur} />);
    wrapper
      .find(TextInput)
      .props()
      .onBlur();
    expect(setFieldTouched).toHaveBeenCalledWith("email");
    expect(onBlur).toHaveBeenCalled();
  });
});
