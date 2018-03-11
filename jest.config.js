const path = require("path");

module.exports = {
  preset: "react-native",
  setupFiles: [path.join(__dirname, "./jest/preamble.js")]
};
