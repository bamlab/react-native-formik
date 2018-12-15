import React from "react";

const withFocusProp = WrappedInput => {
  return class WithFocusProp extends React.PureComponent {
    state = {
      focused: false
    };

    onBlur = () => {
      if (this.props.onBlur) this.props.onBlur();
      this.setState({ focused: false });
    };

    onFocus = () => {
      if (this.props.onFocus) this.props.onFocus();
      this.setState({ focused: true });
    };

    render() {
      return (
        <WrappedInput
          focused={this.state.focused}
          {...this.props}
          onBlur={this.onBlur}
          onFocus={this.onFocus}
        />
      );
    }
  };
};

export default withFocusProp;
