# React Native Formik [![Coverage Status](https://coveralls.io/repos/github/bamlab/react-native-formik/badge.svg?branch=master)](https://coveralls.io/github/bamlab/react-native-formik?branch=master) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release) [![NPM downloads](https://img.shields.io/npm/dm/react-native-formik.svg)](https://www.npmjs.com/package/react-native-formik) [![NPM downloads](https://img.shields.io/npm/dt/react-native-formik.svg)](https://www.npmjs.com/package/react-native-formik)

Forms are very verbose in React, and a lot of the time, you end up copy pasting a lot of boilerplate.

This repository is a set of high order components designed to help you take control again of your forms with React Native and [Formik](https://github.com/jaredpalmer/formik)

**Features**

- Easily composable set of helpers
- Connects your React Native input to Formik with no boilerplate (See `handleTextInput`)
- Add a `type` prop on your TextInput to take care of the input options based on the type (See `withInputTypeProps`)
- Automatically focus the next input (See `withNextInputAutoFocus`)
- Component agnostic: Handle any other form component with any design with `withFormikControl`

The point is to make your forms easy to write and provide features your users will expect with code as small as:

```javascript
<MyInput label="Email" name="email" type="email" />
<MyInput label="Password" name="password" type="password" />
<Switch label="Accept terms and conditions" name="accepted" />
<DatePicker label="Birthday" name="birthday" />
<Button onPress={props.handleSubmit} title="SUBMIT" />
```

**Table of contents**

- [Installation](#installation)
- [Guides](#guides)
  - [The Gist](#the-gist-see-it-in-snack)
  - [Custom components](#custom-components-see-it-in-snack)
  - [Formatting inputs](#formatting-inputs)
  - [Move form above keyboard](#move-form-above-keyboard)
  - [Step by step formik + react-native-formik integration](./doc/formik_step_by_step.md)
- [API](#api)
  - [handleTextInput](#handleTextInput)
  - [withErrorIfNeeded](#withErrorIfNeeded)
  - [withError](#witherror)
  - [withFocus](#withfocus)
  - [withInputTypeProps](#withinputtypeprops)
  - [withNextInputAutoFocus](#withnextinputautofocus)
  - [withTouched](#withtouched)
  - [withPickerValues](#withpickervalues)

## Installation

```shell
yarn add formik react-native-formik
```

## Guides

### The Gist [See it in Snack](https://snack.expo.io/@almouro/react-native-formik-gist)

#### Use any Input component

We can use any `Input` component. It will receive an `error` prop in addition to the usual `TextInput` props.

For instance, we can use [react-native-material-textfield](https://github.com/n4kz/react-native-material-textfield) for the material design.

#### Create our form logic

We can compose our input with `handleTextInput` to make it boilerplate free. It will:

- automatically manage its state in formik provided it has a `name` prop
- automatically set its `error` prop if input is touched or form has been submitted
- automatically adds the correct `TextInput` props dependending on its type (at the moment, `email`, `password`, `digits`, `name` are supported)

Let's add in `withNextInputAutoFocusInput`, which provides those awesome features:

- when an input is submitted, it will automatically focuses on the next or submit the form if it's the last one
- sets return key to "next" or "done" if input is the last one or not
  For `withNextInputAutoFocus` to work, the input component should be a class and implement a `focus` method.

```javascript
import { compose } from "recompose";
import {
  handleTextInput,
  withNextInputAutoFocusInput
} from "react-native-formik";
import { TextField } from "react-native-material-textfield";

const MyInput = compose(
  handleTextInput,
  withNextInputAutoFocusInput
)(TextField);
```

To complement `withNextInputAutoFocusInput`, we need to create a `Form` component, for instance:

```javascript
import { View } from "react-native";
import { withNextInputAutoFocusForm } from "react-native-formik";

const Form = withNextInputAutoFocusForm(View);
```

We can also create a validation schema, with `yup`. It's of course possible to use other validation possibilities provided by Formik, but `yup` makes validation and error messaging painless.

```javascript
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required()
    .email("well that's not an email"),
  password: Yup.string()
    .required()
    .min(2, "pretty sure this will be hacked")
});
```

Then the form in itself becomes simple:

```javascript
export default props => (
  <Formik
    onSubmit={values => console.log(values)}
    validationSchema={validationSchema}
    render={props => {
      return (
        <Form>
          <MyInput label="Email" name="email" type="email" />
          <MyInput label="Password" name="password" type="password" />
          <MyInput label="First Name" name="firstName" type="name" />
          <MyInput label="Last Name" name="lastName" type="name" />
          <Button onPress={props.handleSubmit} title="SUBMIT" />
        </Form>
      );
    }}
  />
);
```

Full code:

```javascript
import React from "react";
import { Button, TextInput, View } from "react-native";
import { compose } from "recompose";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  handleTextInput,
  withNextInputAutoFocusForm,
  withNextInputAutoFocusInput
} from "react-native-formik";
import { TextField } from "react-native-material-textfield";

const MyInput = compose(
  handleTextInput,
  withNextInputAutoFocusInput
)(TextField);
const Form = withNextInputAutoFocusForm(View);

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("please! email?")
    .email("well that's not an email"),
  password: Yup.string()
    .required()
    .min(2, "pretty sure this will be hacked")
});

export default props => (
  <Formik
    onSubmit={values => console.log(values)}
    validationSchema={validationSchema}
    render={props => {
      return (
        <Form>
          <MyInput label="Email" name="email" type="email" />
          <MyInput label="Password" name="password" type="password" />
          <MyInput label="First Name" name="firstName" type="name" />
          <MyInput label="Last Name" name="lastName" type="name" />
          <Button onPress={props.handleSubmit} title="SUBMIT" />
        </Form>
      );
    }}
  />
);
```

Boilerplate-free, hassle-free, our form is awesome with minimum code required.

### Custom components [See it in Snack](https://snack.expo.io/@almouro/react-native-formik-gist)

#### withFormikControl usage

Thanks to `withFormikControl`, `formik` and `react-native-formik` can handle any custom component just like TextInputs, granted that the component takes as props:

```javascript
{
  value: ValueType,
  setFieldValue: (value: ValueType) => void,
  error: ?string,
  setFieldTouched: () => void
}
```

If you want to use `withNextInputAutoFocus`, your component should be a class and have a `focus` method.
Below is a simple example, a full example is available on `./src/Example/DatePicker.js`.

#### Simple Example: using a Switch

A very simple example would be handling a `Switch` component in your form:

```javascript
import React from "react";
import { Text, Switch as RNSwitch } from "react-native";
import { withFormikControl } from "react-native-formik";

class Switch extends React.PureComponent {
  render() {
    const { error, value, setFieldValue, label } = this.props;

    return (
      <React.Fragment>
        <RNSwitch
          value={value}
          ios_backgroundColor={error ? "red" : "transparent"}
          onValueChange={setFieldValue}
        />
        <Text>{label}</Text>
      </React.Fragment>
    );
  }
}

export default withFormikControl(Switch);
```

You can now use it in your form just like any other input:

```javascript
<Switch label="Accept terms and conditions" name="termsAndConditionsAccepted" />
```

### Formatting inputs

You may need to format inputs as the user types in. For instance, adding spaces in a telephone number (`0612345678` -> `06 12 34 56 78`).
Here's how you would do it:

```javascript
const formatPhoneNumber: string => string = (unformattedPhoneNumber) => ...;

...

<Formik
    render={({ values }) => {
      return (
        <Form>
          <MyInput name="phoneNumber" value={formatPhoneNumber(values.phoneNumber)} />
        </Form>
      );
    }}
/>
```

### Move form above keyboard

The purpose of this section is to give you a solution to create a bottom form which will go up when the keyboard appears, and the content at the top at the page will disappear.

You have to:

- Create a form like you learnt above ;
- Use [react-native-keyboard-spacer](https://github.com/Andr3wHur5t/react-native-keyboard-spacer): it will create view with the keyboard's size when the keyboard will opened;
- Use [react-native-hide-with-keyboard](https://github.com/bamlab/react-native-hide-with-keyboard): it will hide component when the keyboard will opened.

```javascript
import React, { PureComponent } from "react";
import { Image, Platform, ScrollView } from "react-native";
import Hide from "react-native-hide-with-keyboard";
import KeyboardSpacer from "react-native-keyboard-spacer";
import { Formik } from "formik";
import { Button, FormFormik, TextInputFormik } from "./components";
const cat = require("./cat.jpg");

class AdoptACat extends PureComponent<{}> {
  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
      >
        <Hide>
          <Image source={cat} style={styles.image} />
        </Hide>
        <View style={styles.fillContainer} />
        <Formik
          onSubmit={() => {}}
          render={props => (
            <FormFormik>
              <TextInputFormik
                name="catName"
                placeholder={"His name"}
                returnKeyType="next"
                type="name"
              />
              <TextInputFormik
                name="humanName"
                placeholder={"Your name"}
                returnKeyType="done"
                type="name"
              />
              <Button text={"Adopt him ..."} />
            </FormFormik>
          )}
        />
        {Platform.OS === "ios" && <KeyboardSpacer />}
      </ScrollView>
    );
  }
}

const styles = {
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 20
  },
  contentContainer: {
    flex: 1
  },
  fillContainer: {
    flex: 1
  },
  image: {
    alignSelf: "center",
    resizeMode: "contain"
  }
};

export default AdoptACat;
```

For Android, we don't have to use react-native-keyboard-spacer because `android:windowSoftInputMode` is in `adjustResize` mode. Indeed, the view is automatically resize and you don't have to fill it like on iOS.

Enjoy your life :

![iOS](https://github.com/bamlab/react-native-formik/blob/master/doc/images/bottomForm.gif)

## API

### withFormikControl

See [usage](#Custom-components)

### handleTextInput

A set of default HOC to manage TextInputs.
Includes `withErrorIfNeeded`, `withInputTypeProps` and `withFormikControl` remapped for specifically for the React Native `TextInput`

### withErrorIfNeeded

Pass in the Formik error for the input as a prop, only if input has been touched or the form has been submitted

### withError

Pass in the Formik error for the input as a prop.

### withFocus

Add a `focused` prop to the input depending on its focus state.

### withInputTypeProps

Let's face it, you'll always want to remove auto-capitalization for email inputs and use the email keyboard.

Using `withInputTypeProps` and passing a `type`, you'll always get the correct props for you input.

```javascript
import { TextInput } from "react-native";
import { withInputTypeProps } from "react-native-formik";

const MyInput = withInputTypeProps(TextInput);

const emailInput = () => <MyInput type="email" />;
```

Authorized types as of now are `email`, `password`, `digits` and `name`. Setting another type has no consequence.

Check [the props set by the type](./src/withInputTypeProps) in the source!

### withNextInputAutoFocus [See example in Snack](https://snack.expo.io/@almouro/Z3JlYX)

- when an input is submitted, it will automatically focuses on the next or submit the form if it's the last one
- sets return key to "next" or "done" if input is the last one or not
- :warning: your input component needs to be a class and needs to implement a `focus` function
- :warning: Inputs need to be wrapped by `withNextInputAutoFocusInput` and the container of the inputs need to be wrapped in `withNextInputAutoFocusForm`.

```javascript
import { TextInput, View } from "react-native";
import {
  withNextInputAutoFocusForm,
  withNextInputAutoFocusInput
} from "react-native-formik";

class CustomInput extends React.PureComponent {
  // Implement a focus function that focused whatever needs to be focused
  focus = () => { this.input.focus(); }

  render() {
    return (
      <TextField ref={input => this.input = input} {...this.props} />
    );
  }
}

const MyInput = withNextInputAutoFocusInput(CustomInput);
const Form = withNextInputAutoFocusForm(View);

export default props => (
  <Formik
    onSubmit={values => console.log(values)}
    validationSchema={validationSchema}
    render={props => {
      return (
        <Form>
          <MyInput label="Email" name="email" type="email" />
          <MyInput label="Password" name="password" type="password" />
          <MyInput label="First Name" name="firstName" type="name" />
        </Form>
      );
    }}
  />
);
```

### withFocusOnFirstError

- when an form is submitted, and some input is invalid, it will automatically focuses on the first error.
- :warning: the previous step `withNextInputAutoFocus` needs to be implemented.
- :warning: The button need to be wrapped by `withFocusOnFirstError`.

```javascript
import { TextInput, View, Button } from "react-native";
import {
  withNextInputAutoFocusForm,
  withNextInputAutoFocusInput,
  withFocusOnFirstError,
} from "react-native-formik";

class CustomInput extends React.PureComponent {
  // Implement a focus function that focused whatever needs to be focused
  focus = () => { this.input.focus(); }
  // Implement your logic hasError().
  hasError = () => !!this.props.error && !!this.props.externalError;

  render() {
    return (
      <TextField ref={input => this.input = input} {...this.props} />
    );
  }
}

const MyInput = withNextInputAutoFocusInput(CustomInput);
const Form = withNextInputAutoFocusForm(View);
const Button = withFocusOnFirstError(Button);

export default props => (
  <Formik
    onSubmit={values => console.log(values)}
    validationSchema={validationSchema}
    render={props => {
      return (
        <Form>
          <MyInput label="Email" name="email" type="email" />
          <MyInput label="Password" name="password" type="password" />
          <MyInput label="First Name" name="firstName" type="name" />
          <Button title="Submit" />
        </Form>
      );
    }}
  />
);
```

We can also trigger this outside Formik context, maybe you wanna do some api calls, set the errors manually and after this focus on errors.

```javascript
import {
  focusOnFirstError,
} from "react-native-formik";

export default props => (
  <Formik
    onSubmit={values => {
      //call apis
      // set the errors manually
      focusOnFirstError();
    }}
    validationSchema={validationSchema}
    render={props => {
      return (
        <Form>
          <MyInput label="Email" name="email" type="email" />
          <MyInput label="Password" name="password" type="password" />
          <MyInput label="First Name" name="firstName" type="name" />
          <Button title="Submit" />
        </Form>
      );
    }}
  />
);
```

### withTouched

Pass in the Formik touched value for the input as a prop.

### withPickerValues

Wraps your component into a `TouchableOpacity` which, when pressed, opens a dialog to pick a value.
You need to provide a `values` props with the pickable items.

If you need to dismiss the picker's "Keyboard", you can use `KeyboardModal.dismiss()` like below.

```javascript
import { TextInput, View } from "react-native";
import { compose } from "recompose";
import makeInput, {
  KeyboardModal,
  withPickerValues
} from "react-native-formik";

const MyPicker = compose(
  makeInput,
  withPickerValues
)(TextInput);

export default props => (
  <Formik
    onSubmit={values => {
      KeyboardModal.dismiss();
      console.log(values);
    }}
    validationSchema={validationSchema}
    render={props => {
      return (
        <View>
          <MyPicker
            name="gender"
            values={[
              { label: "male", value: "Mr" },
              { label: "female", value: "Mrs" }
            ]}
          />
        </View>
      );
    }}
  />
);
```

## Guide

### Move form above keyboard

The purpose of this section is to give you a solution to create a bottom form which will go up when the keyboard appears, and the content at the top at the page will disappear.

You have to:

- Create a form like you learnt above ;
- Use [react-native-keyboard-spacer](https://github.com/Andr3wHur5t/react-native-keyboard-spacer): it will create view with the keyboard's size when the keyboard will opened;
- Use [react-native-hide-with-keyboard](https://github.com/bamlab/react-native-hide-with-keyboard): it will hide component when the keyboard will opened.

```javascript
import React, { PureComponent } from "react";
import { Image, Platform, ScrollView } from "react-native";
import Hide from "react-native-hide-with-keyboard";
import KeyboardSpacer from "react-native-keyboard-spacer";
import { Formik } from "formik";
import { Button, FormFormik, TextInputFormik } from "./components";
const cat = require("./cat.jpg");

class AdoptACat extends PureComponent<{}> {
  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
      >
        <Hide>
          <Image source={cat} style={styles.image} />
        </Hide>
        <View style={styles.fillContainer} />
        <Formik
          onSubmit={() => {}}
          render={props => (
            <FormFormik>
              <TextInputFormik
                name="catName"
                placeholder={"His name"}
                returnKeyType="next"
                type="name"
              />
              <TextInputFormik
                name="humanName"
                placeholder={"Your name"}
                returnKeyType="done"
                type="name"
              />
              <Button text={"Adopt him ..."} />
            </FormFormik>
          )}
        />
        {Platform.OS === "ios" && <KeyboardSpacer />}
      </ScrollView>
    );
  }
}

const styles = {
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 20
  },
  contentContainer: {
    flex: 1
  },
  fillContainer: {
    flex: 1
  },
  image: {
    alignSelf: "center",
    resizeMode: "contain"
  }
};

export default AdoptACat;
```

For Android, we don't have to use react-native-keyboard-spacer because `android:windowSoftInputMode` is in `adjustResize` mode. Indeed, the view is automatically resize and you don't have to fill it like on iOS.

Enjoy your life :

![iOS](https://github.com/bamlab/react-native-formik/blob/master/doc/images/bottomForm.gif)
