import React from "react";
import { Button, Text, ScrollView } from "react-native";
import { Formik } from "formik";
import { compose } from "recompose";
import {
  handleTextInput,
  withNextInputAutoFocusForm,
  withNextInputAutoFocusInput,
  withFormikControl
} from "react-native-formik";
import { TextField } from "react-native-material-textfield";
import * as Yup from "yup";
import DatePicker from "./DatePicker";
import Switch from "./Switch";

const MyInput = compose(
  handleTextInput,
  withNextInputAutoFocusInput
)(TextField);
const Form = withNextInputAutoFocusForm(ScrollView, {
  submitAfterLastInput: false
});
const FocusedDatePicker = compose(
  withFormikControl,
  withNextInputAutoFocusInput
)(DatePicker);

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required()
    .email(),
  password: Yup.string()
    .required()
    .min(6, "Too short"),
  star: Yup.boolean()
    .required()
    .oneOf([true])
});

export default () => (
  <Formik
    onSubmit={values => alert(JSON.stringify(values, null, 2))}
    validationSchema={validationSchema}
    initialValues={{ star: true }}
  >
    {props => {
      return (
        <Form style={{ padding: 10 }}>
          <MyInput label="Email" name="email" type="email" />
          <MyInput label="Password" name="password" type="password" />
          <Switch
            label="If you like the repo, have you starred it 😁?"
            name="star"
          />
          <DatePicker label="Birthday" name="birthday" />

          <Button onPress={props.handleSubmit} title="SUBMIT" />
          <Text>{JSON.stringify(props, null, 2)}</Text>
        </Form>
      );
    }}
  </Formik>
);
