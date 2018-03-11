import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

const mockDocumentForEnzymeMount = () => {
  const jsdom = require("jsdom");

  const { JSDOM } = jsdom;

  const { document } = new JSDOM("").window;
  global.document = document;
};
mockDocumentForEnzymeMount();
