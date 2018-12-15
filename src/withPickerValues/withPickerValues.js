// @flow

import React from "react";
import PickerModal from "./PickerModal";

const withPickerModal = Component => {
  class WithPickerModal extends React.Component<
    $FlowFixMeProps,
    $FlowFixMeState
  > {
    render() {
      const selectedItem =
        this.props.values && this.props.values.length > 0
          ? this.props.values.find(
              item => item && item.value === this.props.value
            )
          : undefined;
      return (
        <PickerModal {...this.props}>
          <Component
            {...this.props}
            value={selectedItem ? selectedItem.label : ""}
          />
        </PickerModal>
      );
    }
  }

  return WithPickerModal;
};

export default withPickerModal;
