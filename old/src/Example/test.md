# Simplify your life

SLIDE BAM

Je bosse à BAM, nous développons des applis mobiles en React Native et comme maintenant on est environ 40 dev React Native, on fait pas mal de projets.
Et y a un truc qu'on fait quasiment sur tous les projets c'est un formulaire.
Et là BAM en décembre 2017 avait un problème : un formulaire disons de 4 champs pouvait nous prendre jusqu'à 1.5 JH de dev.

Pourquoi ça ? En fait un formulaire si on n'y fait pas attention, ça a l'air tout simple et tout mignon comme ça, c'est JUSTE un formulaire quoi ! Il y a vite pas mal de truc à gérer, des cas limites, des oublis qui font que c'est plus complexe que ce qu'on pourrait croire au premier abord.

## Problems

- Lots of boilerplate to write for every form
- Developer might forget key stuff
- Might reinvent the wheel on some aspect

## Manage form state with Formik

### Formik getting started

Là je vais partir du principe que vous avez déjà une input designée qui prend en props

#### Full Formik example with email password

```javascript
import React from "react";
import { Button, TextInput, Text, View } from "react-native";
import { Formik } from "formik";
import { TextField } from "react-native-material-textfield";
import MaterialTextInput from "./MaterialTextInput";

import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email("Welp, that's not an email")
    .required("This email is required"),
  password: Yup.string()
    .min(6, "Too Short!")
    .required("This password is required")
});

export default props => (
  <Formik
    onSubmit={values => alert(JSON.stringify(values, null, 2))}
    validationSchema={SignupSchema}
  >
    {props => {
      console.log(props);
      return (
        <View style={{ padding: 10 }}>
          <TextField
            label="email"
            onChangeText={text => props.setFieldValue("email", text)}
            onBlur={() => props.setFieldTouched("email")}
            error={props.touched.email && props.errors.email}
          />
          <TextField
            label="password"
            onChangeText={text => props.setFieldValue("password", text)}
            onBlur={() => props.setFieldTouched("password")}
            error={props.touched.password && props.errors.password}
          />
          <Button onPress={props.handleSubmit} title="SUBMIT" />

          <Text>{JSON.stringify(props, null, 2)}</Text>
        </View>
      );
    }}
  </Formik>
);
```

#### Introducing React Native Formik

```javascript
import React from "react";
import { Button, TextInput, Text, View } from "react-native";
import { Formik } from "formik";
import manageTextInput from "react-native-formik";
import { TextField } from "react-native-material-textfield";
import MaterialTextInput from "./MaterialTextInput";

import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email("Welp, that's not an email")
    .required("This email is required"),
  password: Yup.string()
    .min(6, "Too Short!")
    .required("This password is required")
});

const MyTextInput = manageTextInput(TextField);

export default props => (
  <Formik
    onSubmit={values => alert(JSON.stringify(values, null, 2))}
    validationSchema={SignupSchema}
  >
    {props => {
      console.log(props);
      return (
        <View style={{ padding: 10 }}>
          <MyTextInput label="email" name="email" />
          <MyTextInput label="password" name="password" />
          <Button onPress={props.handleSubmit} title="SUBMIT" />

          <Text>{JSON.stringify(props, null, 2)}</Text>
        </View>
      );
    }}
  </Formik>
);
```

```javascript
import React from "react";
import { Button, TextInput, Text, ScrollView, View } from "react-native";
import { Formik } from "formik";
import { compose } from "recompose";
import manageTextInput, {
  withNextInputAutoFocusForm,
  withNextInputAutoFocusInput
} from "react-native-formik";
import { TextField } from "react-native-material-textfield";
import MaterialTextInput from "./MaterialTextInput";
import Switch from "./Switch.js";
import withFormikControl from "./withFormikControl";

import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email("Welp, that's not an email")
    .required("This email is required"),
  password: Yup.string()
    .min(6, "Too Short!")
    .required("This password is required")
});

const MyTextInput = compose(
  manageTextInput,
  withNextInputAutoFocusInput
)(TextField);
const MyForm = withNextInputAutoFocusForm(ScrollView);
const MySwitch = withFormikControl(Switch);

export default props => (
  <Formik
    onSubmit={values => alert(JSON.stringify(values, null, 2))}
    validationSchema={SignupSchema}
  >
    {props => {
      console.log(props);
      return (
        <MyForm style={{ padding: 10 }}>
          <MyTextInput label="email" name="email" type="email" />
          <MyTextInput label="password" name="password" type="password" />
          <MyTextInput label="last name" name="lastName" />
          <MySwitch name="coolness" />
          <Text style={{ fontSize: 20 }}>
            Validez-vous que tous les gens du public sont cool?
          </Text>
          <Button onPress={props.handleSubmit} title="SUBMIT" />

          <Text style={{ fontSize: 20 }}>{JSON.stringify(props, null, 2)}</Text>
        </MyForm>
      );
    }}
  </Formik>
);
```

## Use the right props depending on your text input

Can you spot what's wrong on this form?

## Auto focus the next input

## How to handle a custom component

## KEY STUFF WHATEVER

## BUILD SMALL FORMS

## DO NOT AUTO SCROLL LONG FORMS

## Make your error messages fit in the available space as much as possible

## Tweak your forms with KeyboardSpacer et react-native-hide-with-keyboard

```

```
