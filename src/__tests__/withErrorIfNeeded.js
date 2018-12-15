import React from "react";
import { compose } from "recompose";
import { TextInput } from "react-native";
import { mount } from "enzyme";

import { withErrorNew as withErrorIfNeeded } from "../..";
import withFormikMock from "../testUtils/withFormikMock";

console.error = jest.fn();

const TOUCHED_INPUT_NAME = "TOUCHED_INPUT_NAME";
const TOUCHED_INPUT_ERROR = "TOUCHED_INPUT_ERROR";
const UNTOUCHED_INPUT_NAME = "UNTOUCHED_INPUT_NAME";
const UNTOUCHED_INPUT_ERROR = "UNTOUCHED_INPUT_ERROR";

const formikContext = {
  errors: {
    [TOUCHED_INPUT_NAME]: TOUCHED_INPUT_ERROR,
    [UNTOUCHED_INPUT_NAME]: UNTOUCHED_INPUT_ERROR
  },
  touched: {
    [TOUCHED_INPUT_NAME]: true
  },
  submitCount: 0
};
const Input = compose(
  withFormikMock(formikContext),
  withErrorIfNeeded
)(TextInput);

const testInputError = (inputName, expectedError) => {
  const input = mount(<Input name={inputName} />);
  expect(input.find(TextInput).props().error).toEqual(expectedError);
};

describe("withError", () => {
  it("displays error for all inputs if the form is submitted", () => {
    formikContext.submitCount = 1;
    testInputError(UNTOUCHED_INPUT_NAME, UNTOUCHED_INPUT_ERROR);
    testInputError("valid input", undefined);
  });

  it("displays error for touched inputs if the form is not submitted", () => {
    formikContext.submitCount = 0;
    testInputError(UNTOUCHED_INPUT_NAME, undefined);
    testInputError(TOUCHED_INPUT_NAME, TOUCHED_INPUT_ERROR);
  });

  it("keeps other props", () => {
    const wrapper = mount(<Input name="inputName" someProp="someValue" />);
    expect(wrapper.find(TextInput).props().someProp).toEqual("someValue");
  });

  it("allows overriding error prop", () => {
    const erroredInput = mount(
      <Input name={TOUCHED_INPUT_NAME} error="override!!" />
    );
    expect(erroredInput.find(TextInput).props().error).toEqual("override!!");
  });
});
