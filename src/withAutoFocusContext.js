import React from "react";

import AutoFocusContext from "./contexts/autoFocusContext";

export default function withAutoFocusContext(WrappedComponent) {
  return function _withAutoFocusContext(props) {
    return (
      <AutoFocusContext.Consumer>
        {context => <WrappedComponent autoFocusContext={context} {...props} />}
      </AutoFocusContext.Consumer>
    );
  };
}