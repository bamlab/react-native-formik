/** @format */

import React from "react";
import { View } from "react-native";
import { AppRegistry } from "react-native";
import Form from "./Form";
import { name as appName } from "./app.json";

const App = () => (
  <View style={{ paddingTop: 30 }}>
    <Form />
  </View>
);

AppRegistry.registerComponent(appName, () => App);
