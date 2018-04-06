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
    const { values, placeholder, value } = this.props;
    if (values && Platform.OS === 'ios') {
      values.unshift({ value: '', label: placeholder });
    }
    const picker = (
      <Picker onValueChange={this.onValueChange} selectedValue={value} prompt={placeholder}>
        {values.map(item => <Picker.Item key={item.value} {...item} />)}
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
      <View style={{ opacity: 0, position: 'absolute', top: 0, bottom: 0, right: 0, left: 0 }}>
        {picker}
      </View>
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
