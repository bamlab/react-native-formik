import React from "react";
import { compose } from "recompose";
import { TextInput } from "react-native";
import { mount } from "enzyme";

import { makeReactNativeField } from "../..";
import withFormikMock from "../testUtils/withFormikMock";

console.error = jest.fn();

const setFieldValue = jest.fn();
const setFieldTouched = jest.fn();

const formikContext = {
  setFieldValue,
  setFieldTouched,
  values: {
    email: "contact@bam.tech",
    user: {
      username: "bam-dev",
      password: "goodchallenge"
    }
  }
};
const Input = compose(
  withFormikMock(formikContext),
  makeReactNativeField
)(TextInput);

describe("makeReactNativeField", () => {
  it("sets the input value", () => {
    const emailInput = mount(<Input name="email" />);
    expect(emailInput.find(TextInput).props().value).toEqual(
      "contact@bam.tech"
    );
    const otherInput = mount(<Input name="other" />);
    expect(otherInput.find(TextInput).props().value).toEqual(undefined);
  });

  it("sets the input value for nested key name", () => {
    const emailInput = mount(<Input name="user.username" />);
    expect(emailInput.find(TextInput).props().value).toEqual("bam-dev");
    const otherInput = mount(<Input name="user.other" />);
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

  it("handles input touch event to set field as touched and validate", () => {
    const wrapper = mount(<Input name="email" />);
    wrapper
      .find(TextInput)
      .props()
      .onBlur();
    expect(setFieldTouched).toHaveBeenCalledWith("email", true, true);
  });

  it("does not validate on field blur if form is submitting", () => {
    const formikContextSubmitting = {
      setFieldTouched,
      isSubmitting: true
    };
    const InputInSubmittingForm = compose(
      withFormikMock(formikContextSubmitting),
      makeReactNativeField
    )(TextInput);
    const wrapper = mount(<InputInSubmittingForm name="email" />);
    wrapper
      .find(TextInput)
      .props()
      .onBlur();
    expect(setFieldTouched).toHaveBeenCalledWith("email", true, false);
  });

  it("allows override of onBlur", () => {
    const onBlur = jest.fn();
    const wrapper = mount(<Input name="email" onBlur={onBlur} />);
    wrapper
      .find(TextInput)
      .props()
      .onBlur();
    expect(setFieldTouched).toHaveBeenCalledWith("email", true, true);
    expect(onBlur).toHaveBeenCalled();
  });
});
