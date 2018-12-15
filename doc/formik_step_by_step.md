# Formik and React Native Formik Step by Step

This is the livecoding session done at [a meetup](https://www.meetup.com/fr-FR/ReactJS-Paris/events/256773363/) to explain how easy it is to implement forms with `formik`, and why we built react-native-formik to make it even easier.

- [Step 0: let's start with a simple useless form](#step-0-lets-start-with-a-simple-useless-form)
- [Step 1: wrap it in Formik](#step-1-wrap-it-in-formik)
- [Step 2: connect our inputs to the formik context](#step-2-connect-our-inputs-to-the-formik-context)
- [Step 3: let's submit!](#step-3-lets-submit)
- [Step 4: So easy to add validation](#step-4-so-easy-to-add-validation)
- [Step 5: Show errors only when necessary](#step-5-show-errors-only-when-necessary)
- [Step 6: Introducing react-native-formik](#step-6-introducing-react-native-formik)
- [Step 7: handling types of inputs](#step-7-handling-types-of-inputs)
- [Step 8: auto focus the next input](#step-8-auto-focus-the-next-input)
- [Step 9: handle any component](#step-9-handle-any-component)
- [Step 10: Questions?](#step-10-questions)

## Step 0: let's start with a simple useless form

```javascript
import React from "react";
import { Button, TextInput, View } from "react-native";
import { TextField } from "react-native-material-text-field";

export default () => (
  <View style={{ padding: 10 }}>
    <TextField label="email" />
    <TextField label="password" />

    <Button onPress={() => alert("SUBMIT WOUHOU")} title="SUBMIT" />
  </View>
);
```

![image](https://user-images.githubusercontent.com/4534323/50046957-da65f280-00ac-11e9-8aa1-7a7a5b5b6336.png)

Obviously this won't do much, let's wrap it in Formik.

## Step 1: wrap it in Formik

`formik` provides context to the form that we can display in a `Text` component.

```javascript
import React from "react";
import { Text, View } from "react-native";
import { Formik } from "formik";
import { TextField } from "react-native-material-textfield";

export default props => (
  <Formik>
    {props => {
      return (
        <View style={{ padding: 10 }}>
          <TextField label="email" />
          <TextField label="password" />

          <Text style={{ fontSize: 20 }}>{JSON.stringify(props, null, 2)}</Text>
        </View>
      );
    }}
  </Formik>
);
```

![image](https://user-images.githubusercontent.com/4534323/50047009-accd7900-00ad-11e9-9488-990069375f19.png)

As we can see, `formik` exposes the whole form state, but typing text doesn't change anything. Indeed, we have to explicitely tell our inputs to modify the formik context when their values change.

## Step 2: connect our inputs to the formik context

We'll add `onChangeText={text => props.setFieldValue("email", text)}` on the inputs:

```javascript
import React from "react";
import { Text, View } from "react-native";
import { Formik } from "formik";
import { TextField } from "react-native-material-textfield";

export default props => (
  <Formik>
    {props => {
      return (
        <View style={{ padding: 10 }}>
          <TextField
            label="email"
            onChangeText={text => props.setFieldValue("email", text)}
          />
          <TextField
            label="password"
            onChangeText={text => props.setFieldValue("password", text)}
          />

          <Text style={{ fontSize: 20 }}>{JSON.stringify(props, null, 2)}</Text>
        </View>
      );
    }}
  </Formik>
);
```

Awesome, now the values are updated directly!

![image](https://user-images.githubusercontent.com/4534323/50047036-4432cc00-00ae-11e9-95c5-8a3fedac0f34.png)

## Step 3: let's submit!

We can now add a `Button` to submit:

```javascript
import React from "react";
import { Button, Text, View } from "react-native";
import { Formik } from "formik";
import { TextField } from "react-native-material-textfield";

export default props => (
  <Formik onSubmit={values => alert(JSON.stringify(values, null, 2))}>
    {props => {
      return (
        <View style={{ padding: 10 }}>
          <TextField
            label="email"
            onChangeText={text => props.setFieldValue("email", text)}
          />
          <TextField
            label="password"
            onChangeText={text => props.setFieldValue("password", text)}
          />

          <Button onPress={props.handleSubmit} title="SUBMIT" />

          <Text style={{ fontSize: 20 }}>{JSON.stringify(props, null, 2)}</Text>
        </View>
      );
    }}
  </Formik>
);
```

![image](https://user-images.githubusercontent.com/4534323/50047050-a12e8200-00ae-11e9-9635-2e649fe11f2a.png)

## Step 4: So easy to add validation

We can create a `validationSchema` with the JS lib `yup` and bring validation to our form with ease!
Plus it's easy to add any custom validation message you'd like.
Since `react-native-material-text-field` takes `error` as prop, let's pass it

```javascript
import React from "react";
import { Button, Text, View } from "react-native";
import { Formik } from "formik";
import { TextField } from "react-native-material-textfield";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required()
    .email("Welp, that's not an email"),
  password: Yup.string()
    .required()
    .min(6, "That can't be very secure")
});

export default props => (
  <Formik
    onSubmit={values => alert(JSON.stringify(values, null, 2))}
    validationSchema={validationSchema}
  >
    {props => {
      return (
        <View style={{ padding: 10 }}>
          <TextField
            label="email"
            onChangeText={text => props.setFieldValue("email", text)}
            error={props.errors.email}
          />
          <TextField
            label="password"
            onChangeText={text => props.setFieldValue("password", text)}
            error={props.errors.password}
          />

          <Button onPress={props.handleSubmit} title="SUBMIT" />

          <Text style={{ fontSize: 20 }}>{JSON.stringify(props, null, 2)}</Text>
        </View>
      );
    }}
  </Formik>
);
```

`formik` automatically validates your fields and prevents submission if there are errors.

![image](https://user-images.githubusercontent.com/4534323/50047106-81e42480-00af-11e9-8551-cc91b2813c1a.png)

Now we have an issue though, the errors display as soon as I type anything, quite annoying for the user.

## Step 5: Show errors only when necessary

The best practice is to show an error only if an input has been focused then left (we'll mark it as "touched" in formik in that case) or if the form has been submitting.
The good news is we can handle that with what `formik` gives us:

We can add on the input:

```javascript
error={
  props.touched.email || props.submitCount > 0
    ? props.errors.email
    : null
}
```

And the code becomes:

```javascript
import React from "react";
import { Button, Text, View } from "react-native";
import { Formik } from "formik";
import { TextField } from "react-native-material-textfield";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required()
    .email("Welp, that's not an email"),
  password: Yup.string()
    .required()
    .min(6, "That can't be very secure")
});

export default props => (
  <Formik
    onSubmit={values => alert(JSON.stringify(values, null, 2))}
    validationSchema={validationSchema}
  >
    {props => {
      return (
        <View style={{ padding: 10 }}>
          <TextField
            label="email"
            onChangeText={text => props.setFieldValue("email", text)}
            onBlur={() => props.setFieldTouched("email")}
            error={
              props.touched.email || props.submitCount > 0
                ? props.errors.email
                : null
            }
          />
          <TextField
            label="password"
            onChangeText={text => props.setFieldValue("password", text)}
            onBlur={() => props.setFieldTouched("password")}
            error={
              props.touched.password || props.submitCount > 0
                ? props.errors.password
                : null
            }
          />

          <Button onPress={props.handleSubmit} title="SUBMIT" />

          <Text style={{ fontSize: 20 }}>{JSON.stringify(props, null, 2)}</Text>
        </View>
      );
    }}
  </Formik>
);
```

Ok, we talked about reducing boilerplate, but I see a lot of code repetition between the password and the email input. We need a refactoring, and react-native-formik makes it easy for you.

## Step 6: Introducing react-native-formik

With react-native-formik:

```javascript
onChangeText={text => props.setFieldValue("password", text)}
onBlur={() => props.setFieldTouched("password")}
error={
  props.touched.password || props.submitCount > 0
    ? props.errors.password
    : null
}
```

is equivalent to:

```javascript
name = "password";
```

Thanks to a [High Order Component](https://reactjs.org/docs/higher-order-components.html) called `handleTextInput`.

The code becomes cleaner:

```javascript
import React from "react";
import { Button, Text, View } from "react-native";
import { Formik } from "formik";
import { handleTextInput } from "react-native-formik";
import { TextField } from "react-native-material-textfield";
import * as Yup from "yup";

const FormikInput = handleTextInput(TextField);

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required()
    .email("Welp, that's not an email"),
  password: Yup.string()
    .required()
    .min(6, "That can't be very secure")
});

export default props => (
  <Formik
    onSubmit={values => alert(JSON.stringify(values, null, 2))}
    validationSchema={validationSchema}
  >
    {props => {
      return (
        <View style={{ padding: 10 }}>
          <FormikInput label="email" name="email" />
          <FormikInput label="password" name="password" />

          <Button onPress={props.handleSubmit} title="SUBMIT" />

          <Text style={{ fontSize: 20 }}>{JSON.stringify(props, null, 2)}</Text>
        </View>
      );
    }}
  </Formik>
);
```

## Step 7: handling types of inputs

But now we're lacking a few essential features. You probably noticed some unacceptable behaviors in the form. Yes:

- the password input is not hidden
- it's also auto capitalized
- the email input doesn't show the `@` in the keyboard

Whenever you build a form, there are a few input props you should never forget to set.

The good news is with `react-native-formik`, you can just add a `type` to your input:

```javascript
<FormikInput label="email" name="email" type="email" />
```

Much better:
![image](https://user-images.githubusercontent.com/4534323/50047210-67ab4600-00b1-11e9-9282-7f4f0e92739f.png)

## Step 8: auto focus the next input

When typing on a form, users can be used to click "next" on the keyboard to automatically go to the next input and submit on the last input.

In React Native, to do so, you have to change `returnKeyType` on your inputs, and add `onSubmitEditing={() => this.nextInputRef.focus()}` on every input. Which requires you to add refs to all your inputs.

With `react-native-formik`, we can use two HOC:

- `withNextInputAutoFocusForm` on the view containing all inputs
- `withNextInputAutoFocusInput` on the inputs

as long as the decorated input:

- is a class
- has a focus metho

With code as small as this, we have this behavior handled:

```javascript
import React from "react";
import { Button, Text, View } from "react-native";
import { Formik } from "formik";
import { compose } from "recompose";
import {
  handleTextInput,
  withNextInputAutoFocusForm,
  withNextInputAutoFocusInput
} from "react-native-formik";
import { TextField } from "react-native-material-textfield";
import * as Yup from "yup";

const FormikInput = compose(
  handleTextInput,
  withNextInputAutoFocusInput
)(TextField);
const InputsContainer = withNextInputAutoFocusForm(View);

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required()
    .email("Welp, that's not an email"),
  password: Yup.string()
    .required()
    .min(6, "That can't be very secure")
});

export default props => (
  <Formik
    onSubmit={values => alert(JSON.stringify(values, null, 2))}
    validationSchema={validationSchema}
  >
    {props => {
      return (
        <InputsContainer style={{ padding: 10 }}>
          <FormikInput label="email" name="email" type="email" />
          <FormikInput label="password" name="password" type="password" />

          <Button onPress={props.handleSubmit} title="SUBMIT" />

          <Text style={{ fontSize: 20 }}>{JSON.stringify(props, null, 2)}</Text>
        </InputsContainer>
      );
    }}
  </Formik>
);
```

## Step 9: handle any component

Well there's more to life than TextInputs. But for any component you want to have, you can use `withFormikControl` to easily manage its state in `formik`.

`withFormikControl` will pass the following props:

```javascript
{
  value: ValueType,
  setFieldValue: (value: ValueType) => void,
  error: ?string,
  setFieldTouched: () => void
}
```

So, for instance you could have a simple `Switch` component:

```javacript
import React from "react";
import { Text, Switch as RNSwitch, View } from "react-native";
import { withFormikControl } from "react-native-formik";

class Switch extends React.PureComponent {
  render() {
    const { error, value, setFieldValue, label } = this.props;

    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 10
        }}
      >
        <RNSwitch
          value={value}
          ios_backgroundColor={error ? "red" : "transparent"}
          onValueChange={setFieldValue}
        />
        <Text style={{ marginLeft: 10, flex: 1 }}>{label}</Text>
      </View>
    );
  }
}

export default withFormikControl(Switch);
```

And easily add it to your form:

```javascript
import React from "react";
import { Button, Text, View } from "react-native";
import { Formik } from "formik";
import { compose } from "recompose";
import {
  handleTextInput,
  withNextInputAutoFocusForm,
  withNextInputAutoFocusInput
} from "react-native-formik";
import { TextField } from "react-native-material-textfield";
import * as Yup from "yup";
import Switch from "./Switch";

const FormikInput = compose(
  handleTextInput,
  withNextInputAutoFocusInput
)(TextField);
const InputsContainer = withNextInputAutoFocusForm(View);

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required()
    .email("Welp, that's not an email"),
  password: Yup.string()
    .required()
    .min(6, "That can't be very secure"),
  star: Yup.boolean()
    .required()
    .oneOf([true], "Feel free to submit an issue if you found some bugs!")
});

export default props => (
  <Formik
    onSubmit={values => alert(JSON.stringify(values, null, 2))}
    validationSchema={validationSchema}
  >
    {props => {
      return (
        <InputsContainer style={{ padding: 10 }}>
          <FormikInput label="email" name="email" type="email" />
          <FormikInput label="password" name="password" type="password" />
          <Switch
            label="If you like the repo, have you starred it 😁?"
            name="star"
          />
          <Button onPress={props.handleSubmit} title="SUBMIT" />

          <Text style={{ fontSize: 20 }}>{JSON.stringify(props, null, 2)}</Text>
        </InputsContainer>
      );
    }}
  </Formik>
);
```

![image](https://user-images.githubusercontent.com/4534323/50047321-19974200-00b3-11e9-929a-f5e73dc7bab3.png)

## Step 10: Questions?

Feel free to star this repo if you like it as well as [formik](https://github.com/jaredpalmer/formik)!
Please open issues if something's wrong with it, you can also ping me on [Twitter @almouro](https://twitter.com/almouro)
