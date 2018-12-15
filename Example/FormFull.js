import React from "react";
import { Button, TextInput, Text, ScrollView, View } from "react-native";
import { Formik } from "formik";
import { TextField } from "./TextField";

export default () => (
  <View style={{ padding: 10 }}>
    <TextField label="email" />
    <TextField label="password" />

    <Button onPress={() => alert("SUBMIT WOUHOU")} title="SUBMIT" />
  </View>
);
import React from "react";
import { Button, TextInput, Text, ScrollView, View } from "react-native";
import { Formik } from "formik";
import { TextField } from "react-native-material-textfield";

export default props => (
  <Formik>
    {props => {
      console.log(props);
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
import React from "react";
import { Button, TextInput, Text, ScrollView, View } from "react-native";
import { Formik } from "formik";
import { TextField } from "react-native-material-textfield";

export default props => (
  <Formik onSubmit={values => alert(JSON.stringify(values, null, 2))}>
    {props => {
      console.log(props);
      return (
        <View style={{ padding: 10 }}>
          <TextField
            label="email"
            onChangeText={text => props.setFieldValue("email", text)}
            onBlur={() => props.setFieldTouched("email")}
          />
          <TextField
            label="password"
            onChangeText={text => props.setFieldValue("password", text)}
            onBlur={() => props.setFieldTouched("password")}
          />

          <Text style={{ fontSize: 20 }}>{JSON.stringify(props, null, 2)}</Text>
        </View>
      );
    }}
  </Formik>
);
import React from "react";
import { Button, TextInput, Text, ScrollView, View } from "react-native";
import { Formik } from "formik";
import { TextField } from "react-native-material-textfield";

export default props => (
  <Formik onSubmit={values => alert(JSON.stringify(values, null, 2))}>
    {props => {
      console.log(props);
      return (
        <View style={{ padding: 10 }}>
          <TextField
            label="email"
            onChangeText={text => props.setFieldValue("email", text)}
            onBlur={() => props.setFieldTouched("email")}
          />
          <TextField
            label="password"
            onChangeText={text => props.setFieldValue("password", text)}
            onBlur={() => props.setFieldTouched("password")}
          />
          <Button onPress={props.handleSubmit} title="SUBMIT" />

          <Text style={{ fontSize: 20 }}>{JSON.stringify(props, null, 2)}</Text>
        </View>
      );
    }}
  </Formik>
);
import React from "react";
import { Button, TextInput, Text, ScrollView, View } from "react-native";
import { Formik } from "formik";
import { TextField } from "react-native-material-textfield";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required()
    .email(),
  password: Yup.string()
    .required()
    .min(6)
});

export default props => (
  <Formik
    onSubmit={values => alert(JSON.stringify(values, null, 2))}
    validationSchema={validationSchema}
  >
    {props => {
      console.log(props);
      return (
        <View style={{ padding: 10 }}>
          <TextField
            label="email"
            onChangeText={text => props.setFieldValue("email", text)}
            onBlur={() => props.setFieldTouched("email")}
            error={props.errors.email}
          />
          <TextField
            label="password"
            onChangeText={text => props.setFieldValue("password", text)}
            onBlur={() => props.setFieldTouched("password")}
            error={props.errors.password}
          />
          <Button onPress={props.handleSubmit} title="SUBMIT" />

          <Text style={{ fontSize: 20 }}>{JSON.stringify(props, null, 2)}</Text>
        </View>
      );
    }}
  </Formik>
);
import React from "react";
import { Button, TextInput, Text, ScrollView, View } from "react-native";
import { Formik } from "formik";
import { TextField } from "react-native-material-textfield";
import * as Yup from "yup";
import handleReactNativeInput from "react-native-formik";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required()
    .email(),
  password: Yup.string()
    .required()
    .min(6)
});

const FormInput = handleReactNativeInput(TextField);

export default props => (
  <Formik
    onSubmit={values => alert(JSON.stringify(values, null, 2))}
    validationSchema={validationSchema}
  >
    {props => {
      console.log(props);
      return (
        <View style={{ padding: 10 }}>
          <FormInput label="email" name="email" />
          <FormInput label="password" name="password" />
          <FormInput label="Last Name" name="lastName" />
          <Button onPress={props.handleSubmit} title="SUBMIT" />

          <Text style={{ fontSize: 20 }}>{JSON.stringify(props, null, 2)}</Text>
        </View>
      );
    }}
  </Formik>
);
import React from "react";
import { Button, TextInput, Text, ScrollView, View } from "react-native";
import { Formik } from "formik";
import { TextField } from "react-native-material-textfield";
import * as Yup from "yup";
import handleReactNativeInput from "react-native-formik";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required()
    .email(),
  password: Yup.string()
    .required()
    .min(6)
});

const FormInput = handleReactNativeInput(TextField);

// Maintenant vous devriez vous dire, il y a un truc qui ne va pas avec ce formulaire. En vrai, il y a encore plusieurs choses qui ne vont pas mais il y en a une en particulier qui saute aux yeux. Qu'est-ce que vous pensez de notre formulaire si je tape un mot de passe. C'est le moment où je vous fais travailler un peu, est-ce que quelqu'un voit ce qui ne va pas ?
// Non ? On voit le mot de passe en clair ! Et oui car dépendant du type de notre input on doit passer certaines props à l'input que l'on peut facilement oublier, pour le password il faut le cacher, il faut s'assurer que la première lettre n'est pas auto capitalisée, pour l'email il faut aussi s'assurer qu'il n'y a pas d'auto capitalisation et que le clavier est de type email, cad il a un arobas
// Bon je suis à un meetup react + react native, j'étais plutôt développeur Web avant, j'aimerais bien juste passer un type à mes input, non ?
// Et bien la bonne nouvelle c'est que ça marche direct avec react native formik. En fonction de la prop type le code est très simple il vous assigne les props qu'il faut !

export default props => (
  <Formik
    onSubmit={values => alert(JSON.stringify(values, null, 2))}
    validationSchema={validationSchema}
  >
    {props => {
      console.log(props);
      return (
        <View style={{ padding: 10 }}>
          <FormInput label="email" name="email" type="email" />
          <FormInput label="password" name="password" type="password" />
          <FormInput label="Last Name" name="lastName" />
          <Button onPress={props.handleSubmit} title="SUBMIT" />

          <Text style={{ fontSize: 20 }}>{JSON.stringify(props, null, 2)}</Text>
        </View>
      );
    }}
  </Formik>
);
import React from "react";
import { Button, TextInput, Text, ScrollView, View } from "react-native";
import { compose } from "recompose";
import { Formik } from "formik";
import { TextField } from "react-native-material-textfield";
import * as Yup from "yup";
import handleReactNativeInput, {
  withNextInputAutoFocusForm,
  withNextInputAutoFocusInput
} from "react-native-formik";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required()
    .email(),
  password: Yup.string()
    .required()
    .min(6)
});

const FormInput = compose(
  handleReactNativeInput,
  withNextInputAutoFocusInput
)(TextField);
const Form = withNextInputAutoFocusForm(View);

// Il y a un autre comportement qui nous manque auquel surtout des utilisateurs iOS peuvent être habitués.
// Si je tape mon email et que je clique ici, est-ce que vous voyez le problème ?
// On s'attendrait à ce qu'il y ait écrit next sur mon clavier et que le focus passe au champ suivant
// Donc en RN pur j'ajouterais returnKey="next" et onSubmitEditing je devrais stocker une ref de la prochaine input et faire ça pour toutes mes inputs
export default props => (
  <Formik
    onSubmit={values => alert(JSON.stringify(values, null, 2))}
    validationSchema={validationSchema}
  >
    {props => {
      console.log(props);
      return (
        <Form style={{ padding: 10 }}>
          <FormInput label="email" name="email" type="email" />
          <FormInput label="password" name="password" type="password" />
          <FormInput label="Last Name" name="lastName" />
          <Button onPress={props.handleSubmit} title="SUBMIT" />

          <Text style={{ fontSize: 20 }}>{JSON.stringify(props, null, 2)}</Text>
        </Form>
      );
    }}
  </Formik>
);
import React from "react";
import { Button, TextInput, Text, ScrollView, View } from "react-native";
import { compose } from "recompose";
import { Formik } from "formik";
import { TextField } from "react-native-material-textfield";
import * as Yup from "yup";
import handleReactNativeInput, {
  withNextInputAutoFocusForm,
  withNextInputAutoFocusInput
} from "react-native-formik";
import Switch from "./Switch";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required()
    .email(),
  password: Yup.string()
    .required()
    .min(6),
  coolness: Yup.boolean()
    .required()
    .oneOf([true])
});

const FormInput = compose(
  handleReactNativeInput,
  withNextInputAutoFocusInput
)(TextField);
const Form = withNextInputAutoFocusForm(ScrollView);

// Maintenant vous allez me dire c'est bien gentil tout ça mais on a que des text inputs, dans mes formulaires j'ai plein de champs différents à gérer
// La beauté de formik et react-native-formik c'est qu'il peut s'accorder avec n'importe lequel de vos composants
// Par exemple, si vous avex envie de rajouter un switch dans l'app (c'est plus ou moins l'équivalent natif d'une checkbox)
// On va pouvoir utiliser le composant withFormikControl pour l'intégrer directement dans notre state formik
// withFormikControl est un HOC qui s'attend à ce que votre composant prenne les props suivantes
export default props => (
  <Formik
    onSubmit={values => alert(JSON.stringify(values, null, 2))}
    validationSchema={validationSchema}
  >
    {props => {
      console.log(props);
      return (
        <Form style={{ padding: 10 }} keyboardShouldPersistTaps="handled">
          <FormInput label="email" name="email" type="email" />
          <FormInput label="password" name="password" type="password" />
          <FormInput label="Last Name" name="lastName" />
          <Button onPress={props.handleSubmit} title="SUBMIT" />
          <Switch
            name="coolness"
            label="Validez-vous que tous les gens du public sont cool?"
          />

          <Text style={{ fontSize: 20 }}>{JSON.stringify(props, null, 2)}</Text>
        </Form>
      );
    }}
  </Formik>
);
