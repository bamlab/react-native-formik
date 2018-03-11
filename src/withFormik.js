import { getContext } from "recompose";
import PropTypes from "prop-types";

const withFormik = getContext({ formik: PropTypes.object });

export default withFormik;
