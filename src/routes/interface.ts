import { FunctionComponent } from 'react';

export interface Route {
    path: string;
    component: () => JSX.Element;
    layout: FunctionComponent<any> | null;
}
