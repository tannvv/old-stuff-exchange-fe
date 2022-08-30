import { IconType } from 'react-icons';

export default interface IMenuItem {
    icon?: IconType;
    title?: string;
    to?: string;
    code?: string;
    data?: IMenuItem[];
    children?: IMenuItem;
    separate?: boolean;
}
