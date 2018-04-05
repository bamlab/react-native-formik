# React Native Formik [![Coverage Status](https://coveralls.io/repos/github/bamlab/react-native-formik/badge.svg?branch=master)](https://coveralls.io/github/bamlab/react-native-formik?branch=master) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

Forms are very verbose in React, and a lot of the time, you end up copy pasting a lot of boilerplate.

This repository is a set of high order components designed to help you take control again of your forms with React Native and [Formik](https://github.com/jaredpalmer/formik)

**Features**

* Easily composable set of helpers
* Connects your React Native input to Formik with no boilerplate (See `makeReactNativeField`)
* Add a `type` prop on your TextInput to take care of the input options based on the type (See `withInputTypeProps`)
* Automatically focus the next input (See `withNextInputAutoFocus`)
* Awesome Test coverage [![Coverage Status](https://coveralls.io/repos/github/bamlab/react-native-formik/badge.svg?branch=master)](https://coveralls.io/github/bamlab/react-native-formik?branch=master)

**Table of contents**

* [Installation](#installation)
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
yarn add react-native-formik
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
import Yup from 'yup';

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
import Yup from 'yup';
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

```javascript
import { TextInput, View } from 'react-native';
import { withPickerValues } from 'react-native-formik';

const MyPicker = withPickerValues(TextInput);

export default props => (
  <Formik
    onSubmit={values => console.log(values)}
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
