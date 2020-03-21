import React from "react";
import { TextInput } from "react-native";
import { mount } from "enzyme";

import { withFocus } from "../..";

console.error = jest.fn();

const Input = withFocus(TextInput);

describe("withFocus", () => {
  it("sets the focus prop", () => {
    const wrapper = mount(<Input />);

    expect(wrapper.find(TextInput).props().focused).toEqual(false);

    wrapper
      .find(TextInput)
      .props()
      .onFocus();
    wrapper.update();
    expect(wrapper.find(TextInput).props().focused).toEqual(true);

    wrapper
      .find(TextInput)
      .props()
      .onBlur();
    wrapper.update();
    expect(wrapper.find(TextInput).props().focused).toEqual(false);
  });

  it("calls onFocus and onBlur if passed", () => {
    const onFocus = jest.fn();
    const onBlur = jest.fn();

    const wrapper = mount(<Input onFocus={onFocus} onBlur={onBlur} />);

    expect(wrapper.find(TextInput).props().focused).toEqual(false);

    wrapper
      .find(TextInput)
      .props()
      .onFocus();
    wrapper.update();
    expect(onFocus).toHaveBeenCalled();
    expect(wrapper.find(TextInput).props().focused).toEqual(true);

    wrapper
      .find(TextInput)
      .props()
      .onBlur();
    wrapper.update();
    expect(onBlur).toHaveBeenCalled();
    expect(wrapper.find(TextInput).props().focused).toEqual(false);
  });
});
