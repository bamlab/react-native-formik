const path = require("path");

module.exports = {
  preset: "react-native",
  transformIgnorePatterns: [
    "node_modules/(?!(react-native|react-native-button|react-native-core-library|@bam.tech/[w-]*|static-container|react-native-tab-view)|react-native-iphone-x-helper/)"
  ],
  modulePathIgnorePatterns: ["Example"],
  setupFiles: [path.join(__dirname, "./jest/preamble.js")]
};
