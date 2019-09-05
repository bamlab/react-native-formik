import React, { useContext } from "react";

import AutoFocusContext from "./contexts/AutoFocusContext";

const withNextInputAutoFocusInput = WrappedInput => ({
  name,
  onSubmitEditing,
  ...props
}) => {
  const { getReturnKeyType, setInput, handleSubmitEditing } = useContext(
    AutoFocusContext
  );

  const _onSubmitEditing = () => {
    handleSubmitEditing(name);
    if (onSubmitEditing) onSubmitEditing();
  };

  const _setInput = component => {
    setInput(name, component);
  };

  return (
    <WrappedInput
      name={name}
      onSubmitEditing={_onSubmitEditing}
      ref={_setInput}
      returnKeyType={getReturnKeyType(name)}
      {...props}
    />
  );
};

export default withNextInputAutoFocusInput;
