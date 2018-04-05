// @flow
import React, { PureComponent } from 'react';
import { View, Platform, Picker } from 'react-native';

import KeyboardModal from './KeyboardModal';
import DisableKeyboard from './DisableKeyboard';

type PropsType = {
  values: Array<{ label: string, value: string }>,
};

class PickerModal extends PureComponent<PropsType> {
  pickerModal: ?KeyboardModal;

  openPicker = () => {
    if (this.pickerModal) this.pickerModal.open();
  };

  onValueChange = (value: any) => {
    if (this.props.onChangeText) this.props.onChangeText(value);
  };

  renderPicker = () => {
    const picker = (
      <Picker onValueChange={this.onValueChange} selectedValue={this.props.value}>
        <Picker.Item value="" label={this.props.placeholder} />
        {this.props.values.map(item => <Picker.Item key={item.value} {...item} />)}
      </Picker>
    );

    return Platform.OS === 'ios' ? (
      <KeyboardModal
        ref={ref => {
          this.pickerModal = ref;
        }}
      >
        {picker}
      </KeyboardModal>
    ) : (
      picker
    );
  };

  render() {
    return (
      <View>
        <DisableKeyboard onPress={this.openPicker}>{this.props.children}</DisableKeyboard>
        {this.renderPicker()}
      </View>
    );
  }
}

export default PickerModal;
