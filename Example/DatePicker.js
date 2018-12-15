import React from "react";
import DisableKeyboard from "react-native-formik/src/withPickerValues/DisableKeyboard";
import DateTimePicker from "react-native-modal-datetime-picker";
import { TextField as MaterialTextInput } from "react-native-material-textfield";
import { format } from "date-fns";

class DatePicker extends React.PureComponent {
  state = {
    pickerOpened: false
  };

  focus = () => this.openPicker();

  openPicker = () => {
    this.setState({ pickerOpened: true });
  };

  closePicker = () =>
    this.setState({ pickerOpened: false }, () => {
      this.props.setFieldTouched();
    });

  handleDatePicked = value => {
    this.props.setFieldValue(value);
    this.closePicker();
    if (this.props.onSubmitEditing) this.props.onSubmitEditing();
  };

  render() {
    return (
      <React.Fragment>
        <DisableKeyboard onPress={this.openPicker}>
          <MaterialTextInput
            {...this.props}
            value={
              this.props.value
                ? format(this.props.value, "DD/MM/YYYY")
                : undefined
            }
          />
        </DisableKeyboard>
        <DateTimePicker
          isVisible={this.state.pickerOpened}
          onConfirm={this.handleDatePicked}
          onCancel={this.closePicker}
          {...this.props}
        />
      </React.Fragment>
    );
  }
}

export default DatePicker;
