import './GlobalStyles.scss';
import PropTypes from 'prop-types';

interface Props {
    children: JSX.Element;
}
function GlobalStyles({ children }: Props) {
    return children;
}

GlobalStyles.ropTypes = {
    children: PropTypes.node.isRequired,
};
export default GlobalStyles;
