import React from "react";
import PropTypes from "prop-types";
import { compose, withContext } from "recompose";
import { TextInput } from "react-native";
import { mount } from "enzyme";

import { withError } from "../..";

console.error = jest.fn();

const withFormikMock = withContext({ formik: PropTypes.object }, () => ({
  formik: {
    errors: { errored: "This is an error" }
  }
}));
const Input = compose(withFormikMock, withError)(TextInput);

describe("withError", () => {
  it("sets the error prop", () => {
    const erroredInput = mount(<Input name="errored" />);
    expect(erroredInput.find(TextInput).props().error).toEqual("This is an error");
    const validInput = mount(<Input name="valid" />);
    expect(validInput.find(TextInput).props().error).toBeFalsy();
  });

  it("keeps other props", () => {
    const wrapper = mount(<Input name="inputName" someProp="someValue" />);
    expect(wrapper.find(TextInput).props().someProp).toEqual("someValue");
  });
});
