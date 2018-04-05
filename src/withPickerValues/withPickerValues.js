// @flow

import React from 'react';
import { compose } from 'recompose';

import PickerModal from './PickerModal';

const withPickerModal = Component => props => {
  const selectedItem = props.values.find(item => item.value === props.value);
  return (
    <PickerModal {...props}>
      <Component {...props} value={selectedItem ? selectedItem.label : ''} />
    </PickerModal>
  );
};

export default compose(withPickerModal);
