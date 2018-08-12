# React Native Formik Standard Component

## Checks

- [ ] ⚛️ It is a react Stateless PureComponent
- [ ] 🎯 Its `PropsType` include the following typing
  ```js
    type StandardReactNativeFormikFieldComponentProps = {
      name: string,
      error?: string,
      value?: string | number,
      onChange: (value: string | number) => any,
    }
  ```
- [ ] ❔ (Optionnal) If you want it to work with React Native Formik `withNextInputAutoFocus` helper, it hhas a public `focus` method

## Good example

```js
// @flow
import React, { PureComponent } from 'react';
import { Text, TouchableHighlight, StyleSheet, Keyboard } from 'react-native';
import FieldContainer from './FieldContainer';

type Props = {
  label: string,
  error: string,
  data: Array<{ label: string, value: string | number }>,
  onChange: (value: string | number) => any,
};

class MultiChoices extends PureComponent<Props> {
  focus = () => {
    Keyboard.dismiss();
  };

  render() {
    return (
      <FieldContainer label={this.props.label} error={this.props.error}>
        {this.props.data.map(choice => (
          <Choice
            key={choice.value}
            onPress={this.props.onChange}
            label={choice.label}
            value={choice.value}
            selected={this.props.value === choice.value}
          />
        ))}
      </FieldContainer>
    );
  }
}

type ChoiceProps = {
  label: string,
  value: string | number,
  onPress: (value: string | number) => any,
  selected: boolean,
};

class Choice extends PureComponent<ChoiceProps> {
  onPress = () => {
    this.props.onPress(this.props.value);
  };

  render() {
    return (
      <TouchableHighlight onPress={this.onPress}>
        <Text style={this.props.selected && styles.selectedChoice}>{this.props.label}</Text>
      </TouchableHighlight>
    );
  }
}

type FieldContainerProps = {
  error: string,
  label: string,
  children: Node,
};

class FieldContainer extends PureComponent<FieldContainerProps> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={[styles.label, !!this.props.error && styles.error]}>{this.props.label}</Text>
        {!!this.props.error && (
          <Text style={[styles.errorLabel, styles.error]}>{this.props.error}</Text>
        )}
        {this.props.children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontWeight: '500',
    marginBottom: 8,
  },
  selectedChoice: {
    backgroundColor: 'green',
  },
  error: {
    color: 'red',
  },
  errorLabel: {
    marginBottom: 8,
  },
});

export default MultiChoices;
```
