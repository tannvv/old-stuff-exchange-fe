export interface Route {
    path: string;
    component: () => JSX.Element;
    accessibleRole?: string[];
    layout: React.FC<any> | null;
    className?: string;
}
