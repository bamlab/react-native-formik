import React from "react";
import { TextInput } from "react-native";
import { mount } from "enzyme";

import { withInputTypeProps } from "../..";

console.error = jest.fn();

const Input = withInputTypeProps(TextInput);

describe("withInputTypeProps", () => {
  it("allows overriding of props", () => {
    const wrapper = mount(<Input type="password" secureTextEntry={false} />);
    expect(wrapper.find(TextInput).props().secureTextEntry).toEqual(false);
  });

  it("keeps other props", () => {
    const withoutType = mount(<Input someProp="someValue" />);
    expect(withoutType.find(TextInput).props().someProp).toEqual("someValue");
    const withType = mount(<Input type="email" someProp="someValue" />);
    expect(withType.find(TextInput).props().someProp).toEqual("someValue");
    const withUnknownType = mount(<Input type="unknown" someProp="someValue" />);
    expect(withUnknownType.find(TextInput).props().someProp).toEqual("someValue");
  });
});
