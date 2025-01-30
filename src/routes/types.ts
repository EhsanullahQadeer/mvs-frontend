export interface IRoute {
    path: string;
    name: string;
    component: any;
    props?: any;
    children?: IRoute[];
}