import './GlobalStyles.scss';

interface Props {
    children: JSX.Element;
}
function GlobalStyles({ children }: Props) {
    return children;
}

export default GlobalStyles;
