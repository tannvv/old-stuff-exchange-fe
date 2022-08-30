export interface Route {
    path: string;
    component: () => JSX.Element;
    layout: React.FC<any> | null;
}
