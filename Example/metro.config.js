const path = require("path");
const blacklist = require("metro-config/src/defaults/blacklist");

module.exports = {
  projectRoot: __dirname,
  watchFolders: [path.resolve(__dirname, "..")],
  resolver: {
    blacklistRE: new RegExp(
      `^${escape(path.resolve(__dirname, "..", "node_modules"))}\\/.*$`
    ),
    providesModuleNodeModules: [
      "react-native",
      "react",
      "prop-types",
      "formik",
      "lodash",
      "recompose",
      "react-native-modalbox",
      "react-native-root-siblings",
      "@babel/runtime"
    ]
  }
};
