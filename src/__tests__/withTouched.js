import React from "react";
import { compose } from "recompose";
import { TextInput } from "react-native";
import { mount } from "enzyme";

import { withTouched } from "../..";
import withFormikMock from "../testUtils/withFormikMock";

console.error = jest.fn();

const formikContext = {
  touched: {
    email: true,
    user: {
      username: true
    }
  }
};

const Input = compose(
  withFormikMock(formikContext),
  withTouched
)(TextInput);

describe("withTouched", () => {
  it("sets the touched prop", () => {
    const touchedInput = mount(<Input name="email" />);
    expect(touchedInput.find(TextInput).props().touched).toEqual(true);
    const untouchedInput = mount(<Input name="untouched" />);
    expect(untouchedInput.find(TextInput).props().touched).toBeFalsy();
  });

  it("sets the touched prop for nested key name", () => {
    const touchedInput = mount(<Input name="user.username" />);
    expect(touchedInput.find(TextInput).props().touched).toEqual(true);
    const untouchedInput = mount(<Input name="user.password" />);
    expect(untouchedInput.find(TextInput).props().touched).toBeFalsy();
  });

  it("keeps other props", () => {
    const wrapper = mount(<Input name="inputName" someProp="someValue" />);
    expect(wrapper.find(TextInput).props().someProp).toEqual("someValue");
  });
});
