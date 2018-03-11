import React from "react";
import PropTypes from "prop-types";
import { compose, withContext } from "recompose";
import { TextInput } from "react-native";
import { mount } from "enzyme";

import { withTouched } from "../..";

console.error = jest.fn();

const withFormikMock = withContext({ formik: PropTypes.object }, () => ({
  formik: {
    touched: { touchedInput: true }
  }
}));
const Input = compose(withFormikMock, withTouched)(TextInput);

describe("withTouched", () => {
  it("sets the touched prop", () => {
    const touchedInput = mount(<Input name="touchedInput" />);
    expect(touchedInput.find(TextInput).props().touched).toEqual(true);
    const untouchedInput = mount(<Input name="untouched" />);
    expect(untouchedInput.find(TextInput).props().touched).toBeFalsy();
  });

  it("keeps other props", () => {
    const wrapper = mount(<Input name="inputName" someProp="someValue" />);
    expect(wrapper.find(TextInput).props().someProp).toEqual("someValue");
  });
});
