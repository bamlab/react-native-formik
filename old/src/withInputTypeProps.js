import { mapProps } from "recompose";

const getInputTypeProps = type => {
  switch (type) {
    case "email":
      return {
        autoCorrect: false,
        keyboardType: "email-address",
        autoCapitalize: "none"
      };
    case "password":
      return {
        autoCorrect: false,
        secureTextEntry: true,
        autoCapitalize: "none"
      };
    case "digits":
      return {
        keyboardType: "phone-pad"
      };
    case "name":
      return {
        autoCorrect: false
      };
    default:
      return {};
  }
};

const withInputTypeProps = mapProps(({ type, ...props }) => ({
  ...getInputTypeProps(type),
  ...props
}));

export default withInputTypeProps;
