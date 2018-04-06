// @flow

import React, { PureComponent } from 'react';
import { Easing, Keyboard } from 'react-native';
import Modal from '@bam.tech/react-native-modalbox';
import RootSiblings from '@bam.tech/react-native-root-siblings';

type _Props = {
  style: Object,
  easingAnimation: () => void,
  children: any,
};

const renderModal = (props: _Props, open: ?boolean) => (
  <Modal
    backdrop={false}
    position="bottom"
    moveAboveKeyboard={false}
    isOpen={open}
    style={[{ height: 216, backgroundColor: 'rgb(200, 203, 211)' }, props.style]}
    easing={props.easingAnimation}
  >
    {props.children}
  </Modal>
);

let keyboardModalInstance = null;
let displayedKeyboardComponent = null;
let keyboardModalCount = 0;
let keyboardDidShowListener = null;
let currentProps;

const updateKeyboardModalComponent = (props: _Props, open: ?boolean) => {
  if (open) currentProps = props;
  if (keyboardModalInstance) keyboardModalInstance.update(renderModal(props, open));
};

const open = (keyboardComponent: any) => {
  if (displayedKeyboardComponent) displayedKeyboardComponent.displayed = false;

  displayedKeyboardComponent = keyboardComponent;
  displayedKeyboardComponent.displayed = true;

  updateKeyboardModalComponent(keyboardComponent.props, true);
};

const keyboardDidShow = () => updateKeyboardModalComponent(currentProps, false);

const createKeyboardModalComponent = (props: _Props) => {
  keyboardModalCount += 1;

  if (keyboardModalCount > 1) return;

  currentProps = props;

  keyboardModalInstance = new RootSiblings(renderModal(props));
  keyboardDidShowListener = Keyboard.addListener('keyboardWillShow', keyboardDidShow);
};

const removeKeyboardModalComponent = () => {
  keyboardModalCount -= 1;

  if (keyboardModalCount === 0) {
    if (keyboardDidShowListener) keyboardDidShowListener.remove();
    if (keyboardModalInstance) keyboardModalInstance.remove();
  }
};

export default class KeyboardModal extends PureComponent {
  static dismiss() {
    if (keyboardModalCount > 0) {
      updateKeyboardModalComponent(currentProps, false);
    }
  }

  static defaultProps = {
    easingAnimation: Easing.ease,
  };

  componentWillMount() {
    createKeyboardModalComponent(this.props);
  }

  componentWillReceiveProps(nextProps: _Props) {
    if (this.displayed) {
      updateKeyboardModalComponent(nextProps);
    }
  }

  componentWillUnmount() {
    removeKeyboardModalComponent();
  }

  displayed: boolean = false;

  open() {
    this.displayed = true;
    Keyboard.dismiss();
    open(this);
  }

  close() {
    this.displayed = false;
    updateKeyboardModalComponent(this.props, false);
  }

  render() {
    return null;
  }
}
