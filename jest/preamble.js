import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

const mockDocumentForEnzymeMount = () => {
  const jsdom = require("jsdom");

  const { JSDOM } = jsdom;

  const { window } = new JSDOM("");
  const { document } = window;
  global.document = document;
  global.window = window;
};

mockDocumentForEnzymeMount();
