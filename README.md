# React Native Formik [![Coverage Status](https://coveralls.io/repos/github/bamlab/react-native-formik/badge.svg?branch=master)](https://coveralls.io/github/bamlab/react-native-formik?branch=master) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release) [![NPM downloads](https://img.shields.io/npm/dm/react-native-formik.svg)](https://www.npmjs.com/package/react-native-formik) [![NPM downloads](https://img.shields.io/npm/dt/react-native-formik.svg)](https://www.npmjs.com/package/react-native-formik)

Forms are very verbose in React, and a lot of the time, you end up copy pasting a lot of boilerplate.

This repository is a set of high order components designed to help you take control again of your forms with React Native and [Formik](https://github.com/jaredpalmer/formik)

**Features**

* Easily composable set of helpers
* Easily connect your [React Native Formik Standard Component](./doc/react-native-formik-standard-component.md) to the formik context
* Connects your React Native input to Formik with no boilerplate (See `makeReactNativeField`)
* Add a `type` prop on your TextInput to take care of the input options based on the type (See `withInputTypeProps`)
* Automatically focus the next input (See `withNextInputAutoFocus`)

**Table of contents**

* [Installation](#installation)
* [The Gist](#the-gist)
* [Advanced Example](#advanced-example)
* [Formatting inputs](#formatting-inputs)
* [API](#api)
  * [makeReactNativeField](#makereactnativefield)
  * [setFormikInitialValue](#setFormikInitialValue)
  * [withError](#witherror)
  * [withFocus](#withfocus)
  * [withFormik](#withformik)
  * [withInputTypeProps](#withinputtypeprops)
  * [withNextInputAutoFocus](#withnextinputautofocus)
  * [withTouched](#withtouched)
  * [withPickerValues](#withpickervalues)

## Installation

```shell
yarn add formik react-native-formik
```

## The Gist (with common use cases)

Once you designed `FocusableStandardRNFormikFieldComponent` and `StandardRNFormikFieldComponent` which respects the [React Native Formik Standard Component](./doc/react-native-formik-standard-component.md), here is an example to use those fields.

```js
// lib/Form.js
```
```js
import { compose } from 'recompose';
import { View } from 'react-native';
import {
  withFormikControl,
  withNextInputAutoFocusForm,
  withNextInputAutoFocusInput,
} from 'react-native-formik';

import FocusableStandardRNFormikFieldComponent from 'app/src/components/FocusableStandardRNFormikField';

import StandardRNFormikFieldComponent from 'app/src/components/StandardRNFormikField';

const Container = withNextInputAutoFocusForm(View);
const FocusableStandardRNFormikField = compose(
  withNextInputAutoFocusInput,
  withFormikControl(FocusableStandardRNFormikFieldComponent),
);
const StandardRNFormikField = withFormikControl(StandardRNFormikFieldComponent);

export default {
  Container,
  FocusableStandardRNFormikField,
  StandardRNFormikField,
};
```
```js
// pages/one_form.js
```
```js
import React, { Component } from 'react';
import { View, StyleSheet, TouchableHighlight, Text } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Form from 'app/src/lib/Form';

class OneForm extends Component {
  validationSchema = Yup.object().shape({
    firstNumber: Yup.number().required('required!'),
    secondNumber: Yup.number().required('required!'),
    comments: Yup.string().when('secondNumber', {
      is: OneForm.shouldDisplayCommentsField,
      then: Yup.string().required('required because second number is less than 5!'),
    }), // Dynamic validation
    email: Yup.string()
      .required('required mate!')
      .email("This is not an email")
      .test(
        'alreadyExists',
        "This email already exists in our database :(",
        value =>
          value &&
          new Promise(resolve => {
            setTimeout(() => {
              resolve(value && value.endsWith('exists'));
            }, 2000);
          }) // This asynchronouly validate the data
      ),
  });

  static shouldDisplayCommentsField = secondNumber => secondNumber && secondNumber < 5;

  renderForm = ({ values, handleSubmit }) => (
    <Form.Container style={styles.page}>
      <Form.FocusableStandardRNFormikField name="email" />
      <Form.StandardRNFormikFieldComponent name="firstNumber" />
      <Form.StandardRNFormikFieldComponent name="secondNumber" />
      
      {OneForm.shouldDisplayCommentsField(values.secondNumber) && (
        <Form.StandardRNFormikFieldComponent name="comments" />
      )} // Dynamic field rendering
      <TouchableHighlight onPress={handleSubmit}>
        <Text style={styles.submitButton}>OK</Text>
      </TouchableHighlight>
    </Form.Container>
  );

  render() {
    return (
      <Formik
        onSubmit={values => console.log(values)}
        validationSchema={this.validationSchema}
        render={this.renderForm}
      />
    );
  }
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
    flex: 1,
    padding: 8,
  },
  submitButton: {
    backgroundColor: 'blue',
    textAlign: 'center',
    padding: 4,
    color: 'white',
  },
});

export default OneForm;
```

## Advanced Example

Say we want to create a form with Material design inputs.

### Create a custom input

Let's create our custom text input design, called `MaterialTextInput`:

We can use [react-native-material-textfield](https://github.com/n4kz/react-native-material-textfield) for the material design.

Our component takes `error` and `touched` in addition to the usual `TextInput` props.
Notice our component also implement a `focus` function, for `withNextInputAutoFocus` to work.

```javascript
// MaterialTextInput.js
import React from 'react';
import { Text, View } from 'react-native';
import { TextField } from 'react-native-material-textfield';

export default class MaterialTextInput extends React.PureComponent {
  // Your custom input needs a focus function for `withNextInputAutoFocus` to work
  focus() {
    this.input.focus();
  }

  render() {
    const { error, touched, ...props } = this.props;

    const displayError = !!error && touched;
    const errorColor = 'rgb(239, 51, 64)';

    return (
      <View>
        <TextField
          ref={input => (this.input = input)}
          labelHeight={12}
          baseColor={displayError ? errorColor : '#1976D2'}
          tintColor="#2196F3"
          textColor="#212121"
          {...props}
        />
        <Text
          style={{
            textAlign: 'right',
            color: displayError ? errorColor : 'transparent',
            height: 20,
          }}
        >
          {error}
        </Text>
      </View>
    );
  }
}
```

### Create our form logic

Compose our input with high order components to make it awesome.
`react-native-formik` exports as default `compose(withInputTypeProps, setFormikInitialValue, withError, withTouched, makeReactNativeField);`.

Let's add in `withNextInputAutoFocusInput`:

```javascript
import { compose } from 'recompose';
import makeInputGreatAgain, { withNextInputAutoFocusInput } from 'react-native-formik';
import MaterialTextInput from './MaterialTextInput';

const MyInput = compose(makeInputGreatAgain, withNextInputAutoFocusInput)(MaterialTextInput);
```

To complement `withNextInputAutoFocusInput`, we need to create a `Form` component, for instance:

```javascript
import { View } from 'react-native';
import { withNextInputAutoFocusForm } from 'react-native-formik';

const Form = withNextInputAutoFocusForm(View);
```

We can also create a validation schema, with `yup`. It's of course possible to use other validation possibilities provided by Formik, but `yup` makes validation and error messaging painless.

```javascript
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required()
    .email("well that's not an email"),
  password: Yup.string()
    .required()
    .min(2, 'pretty sure this will be hacked'),
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
import React from 'react';
import { Button, TextInput, View } from 'react-native';
import { compose } from 'recompose';
import { Formik } from 'formik';
import * as Yup from 'yup';
import makeInputGreatAgain, {
  withNextInputAutoFocusForm,
  withNextInputAutoFocusInput,
} from 'react-native-formik';
import MaterialTextInput from './MaterialTextInput';

const MyInput = compose(makeInputGreatAgain, withNextInputAutoFocusInput)(MaterialTextInput);
const Form = withNextInputAutoFocusForm(View);

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('please! email?')
    .email("well that's not an email"),
  password: Yup.string()
    .required()
    .min(2, 'pretty sure this will be hacked'),
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

## Formatting inputs

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

## API

### makeReactNativeField

Connects your React Native component to the Formik context:

* its value will be set
* it will send `onChangeText` and `onBlur` events to Formik

Now you only need this code:

```javascript
import React from 'react';
import { TextInput, View } from 'react-native';
import { Formik } from 'formik';
import { makeReactNativeField } from 'react-native-formik';

const MyInput = makeReactNativeField(TextInput);

export default props => {
  return (
    <Formik
      onSubmit={values => console.log(values)}
      render={props => {
        return (
          <View>
            <MyInput name="email" />
            <MyInput name="password" />
          </View>
        );
      }}
    />
  );
};
```

instead of:

```javascript
import React from 'react';
import { TextInput, View } from 'react-native';
import { Formik } from 'formik';
import { makeReactNativeField } from 'react-native-formik';

const MyInput = makeReactNativeField(TextInput);

export default props => {
  return (
    <Formik
      onSubmit={values => console.log(values)}
      render={props => {
        return (
          <View>
            <MyInput
              name="email"
              value={props.value.email}
              onChangeText={text => props.setFieldValue('email', text)}
              onBlur={() => setFieldTouched('email')}
            />
            <MyInput
              name="password"
              value={props.value.email}
              onChangeText={text => props.setFieldValue('password', text)}
              onBlur={() => setFieldTouched('password')}
            />
          </View>
        );
      }}
    />
  );
};
```

### setFormikInitialValue

Set Input initial value to `""` to Formik without having to use `initialValues` prop.

Especially it allows validation of untouched inputs when pressing submit.

### withError

Pass in the Formik error for the input as a prop.

### withFocus

Add a `focused` prop to the input depending on its focus state.

### withFormik

Pass Formik context as a prop to any component.

### withInputTypeProps

Let's face it, you'll always want to remove auto-capitalization for email inputs and use the email keyboard.

Using `withInputTypeProps` and passing a `type`, you'll always get the correct props for you input.

```javascript
import { TextInput } from 'react-native';
import { withInputTypeProps } from 'react-native-formik';

const MyInput = withInputTypeProps(TextInput);

const emailInput = () => <MyInput type="email" />;
```

Authorized types as of now are `email`, `password`, `digits` and `name`. Setting another type has no consequence.

Check [the props set by the type](./src/withInputTypeProps) in the source!

### withNextInputAutoFocus

* when an input is submitted, it will automatically focuses on the next or submit the form if it's the last one
* sets return key to "next" or "done" if input is the last one or not
* :warning: your input component needs to be a class and needs to implement a `focus` function
* :warning: Inputs need to be wrapped by `withNextInputAutoFocusInput` and the container of the inputs need to be wrapped in `withNextInputAutoFocusForm`.

```javascript
import { TextInput, View } from 'react-native';
import { withNextInputAutoFocusForm, withNextInputAutoFocusInput } from 'react-native-formik';

const MyInput = withNextInputAutoFocusInput(TextInput);
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

### withTouched

Pass in the Formik touched value for the input as a prop.

### withPickerValues

Wraps your component into a `TouchableOpacity` which, when pressed, opens a dialog to pick a value.
You need to provide a `values` props with the pickable items.

If you need to dismiss the picker's "Keyboard", you can use `KeyboardModal.dismiss()` like below.

```javascript
import { TextInput, View } from 'react-native';
import { compose } from "recompose";
import makeInput, { KeyboardModal, withPickerValues } from 'react-native-formik';

const MyPicker = compose(makeInput, withPickerValues)(TextInput);

export default props => (
  <Formik
    onSubmit={values => { KeyboardModal.dismiss(); console.log(values); }}
    validationSchema={validationSchema}
    render={props => {
      return (
        <View>
          <MyPicker
            name="gender"
            values={[{ label: 'male', value: 'Mr' }, { label: 'female', value: 'Mrs' }]}
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

* Create a form like you learnt above ;
* Use [react-native-keyboard-spacer](https://github.com/Andr3wHur5t/react-native-keyboard-spacer): it will create view with the keyboard's size when the keyboard will opened;
* Use [react-native-hide-with-keyboard](https://github.com/bamlab/react-native-hide-with-keyboard): it will hide component when the keyboard will opened.

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
